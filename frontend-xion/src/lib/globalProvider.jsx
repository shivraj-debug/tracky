"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext({
  address: null,
  setAddress: () => {},
});

export const GlobalProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const savedAddress = sessionStorage.getItem("wallet_address");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (address) {
      sessionStorage.setItem("wallet_address", address);
    } else {
      sessionStorage.removeItem("wallet_address");
    }
  }, [address]);

  return (
    <GlobalContext.Provider value={{ address, setAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalProvider = () => useContext(GlobalContext);
