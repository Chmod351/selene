"use client";
import React, { useState, useEffect } from "react";
import EcommerceContext from "./store";
interface ICart {
  productId: string;
  productPrice: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
}
const EcommerceProvider = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [floor, setFloor] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      );
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);

  const addToCart = (product: any) => {
    const existingProduct = cart.find((p) => p._id === product._id);

    if (existingProduct) {
      const newCart = cart.map((p) => {
        if (p._id === product._id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((product) => product._id !== productId);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    // Aquí puedes agregar la lógica para el checkout,
    // como validar datos, procesar el pago, etc.
    console.log("Procesando checkout...");
    // Limpiar el carrito después de un checkout exitoso
    clearCart();
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
        firstName,
        setFirstName,
        lastName,
        setLastName,
        houseNumber,
        setHouseNumber,
        floor,
        setFloor,
        phoneNumber,
        setPhoneNumber,
        address,
        setAddress,
        city,
        setCity,
        state,
        setState,
        country,
        setCountry,
        zipCode,
        setZipCode,
        email,
        setEmail,
        dni,
        setDni,
        error,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export default EcommerceProvider;
