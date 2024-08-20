"use client";
// urlContext.js
import { createContext, useContext, useState } from "react";

const UrlContext = createContext({
  url: "",
  setUrl: (url) => {},
});

export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
