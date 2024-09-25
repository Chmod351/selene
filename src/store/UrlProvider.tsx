"use client";
import React from "react";
// urlContext.js
import { createContext, useContext, useState } from "react";

const UrlContext = createContext({
  url: "",
  // eslint-disable-next-line no-unused-vars
  setUrl: (url: string) => {},
});

export const useUrl = () => useContext(UrlContext);

export const UrlProvider = ({ children }: { children: React.ReactNode }) => {
  const [url, setUrl] = useState("");

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
