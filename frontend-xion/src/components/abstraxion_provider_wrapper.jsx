"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import React from "react";

const AbstraxionProviderWrapper = ({
  children,
}) => {
  const treasuryConfig = {
    treasury: process.env.NEXT_PUBLIC_TREASURY_CONTRACT,
    rpcUrl: "https://rpc.xion-testnet-2.burnt.com/",
    restUrl: "https://api.xion-testnet-2.burnt.com/"
  };

  return (
    <AbstraxionProvider config={treasuryConfig}>{children}</AbstraxionProvider>
  );
};

export default AbstraxionProviderWrapper;