"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalProvider } from "@/lib/globalProvider";
import ChallengeContainer from "@/components/challenges/challenge-container";
import CreateChallenge from "@/components/challenges/create-challenge";

const ChallengePage = () => {
  const { address } = useGlobalProvider();
  const router = useRouter();

  // useEffect(() => {
  //   if (!address) {
  //     router.push("/"); // redirect to homepage if not connected
  //   }
  // }, [address]);

  // if (!address) return null; // or a loading spinner

  return (
    <div className="px-16">
      <span className="w-full flex justify-between items-center my-4">
        <h2 className="w-full ">Your Challenges - {address}</h2>
        <CreateChallenge walletAddress={address} />
      </span>

      <ChallengeContainer walletAddress={address} />
    </div>
  );
};

export default ChallengePage;
