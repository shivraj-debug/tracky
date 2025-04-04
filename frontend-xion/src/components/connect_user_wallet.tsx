"use client";
import React from "react";
import { useEffect } from "react";
import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

import { useRouter } from "next/navigation";

export default function ConnectUserWallet(): React.JSX.Element {
  const router = useRouter();
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  
  // Use the modal state from Abstraxion
  const [, setShowModal] = useModal();

  useEffect(() => {
    if (isConnected) {
      router.push("/challenges");
    }
  }, [isConnected]);

  const FeatureCard: React.FC<{ label: string; description: string }> = ({ label, description }) => {
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
            <div className="flex items-center justify-center">VIEW YOUR ACCOUNT</div>
          ) : (
            "GET STARTED"
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
