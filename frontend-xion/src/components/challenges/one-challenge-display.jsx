"use client";
import React, { useEffect, useState } from "react";
import {
  getOneChallenge,
  markCompletedTask,
  rewardChallenge,
} from "../../lib/api/challenge";
import toast from "react-hot-toast";
import { increasePoints } from "@/lib/api/points";

const OneChallengeDisplay = ({ address, activeChallengeId = "" }) => {
  const [challenge, setChallenge] = useState(null);
  const [streak, setStreak] = useState(0);
  const [todayStreak, setTodayStreak] = useState(0);

  useEffect(() => {
    if (address && activeChallengeId) {
      getOneChallenge(address, activeChallengeId).then((res) => {
        setChallenge(res.data.today_challenge);
        setStreak(res.data.streak);

        if (res.data.today_challenge?.completed) {
          setTodayStreak(1);
        }
      });
    }
  }, [activeChallengeId, address]);

  if (!activeChallengeId || !challenge) return <div>Select a challenge</div>;

  const handleTaskClick = (taskName) => {
    markCompletedTask(address, activeChallengeId, taskName).then((res) => {
      if (res.data.completed) {
        setTodayStreak(1);
        if (!res.data.is_rewarded) {
          increasePoints(address, 1000).then((points) => {
            if (points === -1) {
              return toast.error("Transaction failed");
            } else {
              rewardChallenge(address, activeChallengeId).then(() => {
                toast.success("Challenge completed and rewarded");
              });
            }
          });
        }
      } else {
        setTodayStreak(0);
      }
      setChallenge(res.data);
    });
  };

  return (
    <div>
      <span className="flex w-full justify-between items-center">
        <h2>Challenge</h2>
        <p>🔥 {streak + todayStreak}</p>
      </span>
      <div className="flex flex-col gap-2 mt-4">
        {challenge?.completed_tasks?.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleTaskClick(task.task_name)}
          >
            <span>{task.task_name}</span>
            <span>{task.completed ? "✅" : "◻️"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneChallengeDisplay;
