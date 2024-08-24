"use client";
import React, { useState, useEffect } from "react";
import EcommerceContext from "./store";
import { DataProps } from "./store";

const EcommerceProvider = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

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
      const totalAmount = cart.reduce((a, b) => a + b.price_es * b.quantity, 0);
      setTotal(totalAmount);
      localStorage.setItem("total", JSON.stringify(total));
    };
    calculateTotal();
  }, [cart, total]);

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

  const addToCart = (product: any) => {
    console.log(product);
    const existingProductInCart = cart.find(
      (p) =>
        p._id === product._id &&
        p.color === product.color &&
        p.size === product.size,
    );

    if (existingProductInCart) {
      // Si el producto ya existe en el carrito con el mismo color y tamaño, simplemente incrementa la cantidad
      //
      const newCart = cart.map((p) =>
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
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(
      (product) => product._id + product.color !== productId,
    );
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    setCart([]);
  };

  const checkout = () => {
    console.log("Procesando checkout...");

    clearCart();
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
        checkout,
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
