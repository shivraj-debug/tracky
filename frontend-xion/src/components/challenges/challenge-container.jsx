"use client";
import { getAllChallenges } from "@/lib/api/challenge";
import React, { useEffect, useState } from "react";
import OneChallengeDisplay from "./one-challenge-display";
import { useGlobalProvider } from "@/lib/globalProvider";

const ChallengeContainer = () => {
  const { address } = useGlobalProvider();
  const [activeChallengeId, setActiveChallengeId] = useState("");
  const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    if (address) {
      getAllChallenges(address).then((res) => {
        setChallengeList(res?.data || []);
      });
    }
  }, [address]);

  return (
    <div className="min-h-[400px] grid md:grid-cols-2 gap-2 ">
      <div className="flex flex-col gap-2 col-span-1 border-r border-primary">
        {challengeList.map((challenge) => (
          <p
            key={challenge._id}
            className="px-4 py-2 hover:border hover:shadow-md smooth-animation rounded-md cursor-pointer"
            onClick={() => setActiveChallengeId(challenge._id)}
          >
            {challenge.challenge_name}
          </p>
        ))}
      </div>
      <OneChallengeDisplay address={address} activeChallengeId={activeChallengeId} />
    </div>
  );
};

export default ChallengeContainer;
