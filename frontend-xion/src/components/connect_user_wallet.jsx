"use client";
import React, { useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

import { useRouter } from "next/navigation";
import { useGlobalProvider } from "@/lib/globalProvider";

export default function ConnectUserWallet() {
  const router = useRouter();
  const { data: { bech32Address }, isConnected } = useAbstraxionAccount();
  const [, setShowModal] = useModal();
  const { setAddress } = useGlobalProvider();

  const registerUser = async (address) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("User registered successfully:", data.user);
      } else {
        console.error("Error registering user:", data.message);
      }
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  };

  useEffect(() => {

    if (isConnected) {
      registerUser(bech32Address);
      setAddress(bech32Address);
      router.push("/challenges");
    }
  }, [isConnected]);

  function FeatureCard ({ label, description }) {
    return (
      <div className="bg-primary/50 p-4 rounded-lg ">
        <h2 className="text-white">{label}</h2>
        <p>{description}</p>
      </div>
    );
  };

  const features = [
    {
      label: "Track your habits",
      description: "Monitor and improve your daily habits. 📊",
    },
    {
      label: "Track your Nutritional intake",
      description: "Keep a log of your meals and stay healthy. 🍎",
    },
    {
      label: "Leaderboard",
      description: "Compete with others and stay motivated. 🏆",
    },
    {
      label: "Recipes",
      description: "Discover and try new healthy recipes. 🍳",
    },
  ];


  return (
    <main className="body px-20">
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl">Tracky</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-black px-4 py-2 rounded-lg"
          >
            {bech32Address ? (
              <div className="flex items-center justify-center cursor-pointer">VIEW YOUR ACCOUNT</div>
            ) : (
              <div className="flex items-center justify-center cursor-pointer">GET STARTED</div>
            )}
          </button>
        </div>

        <Abstraxion onClose={() => setShowModal(false)} />

      </nav>
      <div className="min-h-[300px] w-full flex items-center justify-center flex-col gap-4">
        <h1 className="text-6xl text-primary">Tracky</h1>
        <h2 className="text-center">
          Track your habit and Nutritional intake and <br />
          take control of you life
        </h2>
      </div>

      <div className="">
        <h1 className="text-center text-primary/50">Features Offered</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </main>
  );
}
