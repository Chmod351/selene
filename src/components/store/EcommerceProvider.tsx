"use client";
import React, { useState, useEffect } from "react";
import EcommerceContext from "./store.ts";

const EcommerceProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");

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
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const newCart = cart.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((product) => product.id !== productId);
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
