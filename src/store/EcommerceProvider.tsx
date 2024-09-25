"use client";
import React, { useState, useEffect, useMemo } from "react";
import EcommerceContext from "./store";
import { DataProps } from "./store";
const precios = {
  Pickup: 4500,
  Delivery: 6000,
  CABA: 5500,
  GBA: 7500,
};
const EcommerceProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [correoprecio, setCorreoprecio] = useState<number>(precios.Delivery);

  const [userData, setUserDataInfo] = useState<DataProps>({
    firstName: "",
    lastName: "",
    floor: "",
    shippingAddress1: "",
    city: "",
    commentaries: "",
    deliveryMode: "",
    country: "",
    email: "",
    phoneNumber: "",
    state: "",
    userIdCard: "",
    zip: "",
    paymentMethod: "",
  });

  // Cargar el carrito y el total desde localStorage cuando se monta el componente
  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce(
        (a: any, b: any) => a + b.price_es * b.quantity,
        0,
      );
      if (userData.deliveryMode === "PickUp") {
        setCorreoprecio(precios.Pickup);
      }
      if (userData.deliveryMode === "Express_CABA") {
        setCorreoprecio(precios.CABA);
      }
      if (userData.deliveryMode === "Express_GBA") {
        setCorreoprecio(precios.GBA);
      }
      if (userData.deliveryMode === "Standard") {
        setCorreoprecio(precios.Delivery);
      }

      const total = totalAmount + correoprecio;
      setTotal(total);
      localStorage.setItem("total", JSON.stringify(total));
    };

    calculateTotal();
  }, [cart, total, userData.deliveryMode, correoprecio]);

  // Cargar datos desde localStorage cuando se monta el componente

  useEffect(() => {
    const loadFromLocalStorage = async () => {
      const savedCart = localStorage.getItem("cart");
      const savedTotal = localStorage.getItem("total");
      const savedUserDetails = localStorage.getItem("userDetails");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }

      if (savedTotal) {
        const parsedTotal = Number(JSON.parse(savedTotal));
        setTotal(parsedTotal);
      }

      if (savedUserDetails) {
        const parsedUserDetails = JSON.parse(savedUserDetails);
        setUserData(parsedUserDetails);
      }
    };

    loadFromLocalStorage();
  }, []);
  // helpers

  const addToCart = useMemo(
    () => (product: any) => {
      const existingProductInCart = cart.find(
        (p: any) =>
          p._id === product._id &&
          p.color === product.color &&
          p.size === product.size,
      );

      if (existingProductInCart) {
        // Si el producto ya existe en el carrito con el mismo color y tamaño, simplemente incrementa la cantidad
        //
        const newCart = cart.map(
          (p: {
            _id: string;
            color: string;
            size: string;
            quantity: number;
          }) =>
            p._id === product._id &&
            p.color === product.color &&
            p.size === product.size
              ? { ...p, quantity: p.quantity + 1 }
              : p,
        );
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        // Si el producto no existe en el carrito, lo agregas normalmente
        setCart([
          ...cart,
          { ...product, productPrice: product.price_es, quantity: 1 },
        ]);
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cart,
            { ...product, productPrice: product.price_es, quantity: 1 },
          ]),
        );
      }
    },
    [cart, setCart],
  );

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(
      (product: { _id: string; color: string; size: string }) =>
        product._id + product.color !== productId,
    );
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.removeItem("userDetails");
    setCart([]);
  };

  const createOrder = async (paymentId: {
    installments: number;
    paymentMethodId: string;
    payer: { email: string; identification: { type: string; number: string } };
    token: string;
    transaction_amount: number;
  }) => {
    try {
      const requestBody = {
        mercadoPagoInfo: paymentId ?? null,
        orderItems: cart,
        totalPrice: total,
        deliveryMode: userData.deliveryMode,
        paymentMethod: userData.paymentMethod,
        shippingAddress1: userData.shippingAddress1,
        userData: {
          ...userData,
          surname: userData.lastName,
          name: userData.firstName,
          phone: userData.phoneNumber,
          dateOrdered: new Date(),
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API}/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
      if (!response.ok) {
        throw new Error("Error creating order");
      }
      const order = await response.json();
      clearCart();
      return order._id;
    } catch (e) {
      /* handle error */
      console.log(e);
    }
  };

  const setUserData = (data: DataProps) => {
    setUserDataInfo({
      ...data,
    });

    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        ...data,
      }),
    );
  };

  return (
    <EcommerceContext.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        //@ts-ignore
        createOrder,
        cart,
        total,
        userData,
        setUserData,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export default EcommerceProvider;
