import axios from "axios";

// Create a new challenge
const createChallenge = async (challenge_name, tasks, address) => {
  const res = await axios.post(`/api/challenge`, {
    challenge_name,
    tasks,
    address,
  });

  return res.data;
};

// Fetch all challenges for a user
const getAllChallenges = async (address) => {
  const res = await axios.get(`/api/challenge?address=${address}`);
  return res.data;
};

// Fetch a single challenge by ID
const getOneChallenge = async (address, challenge_id) => {
  const res = await axios.get(
    `/api/challenge/${challenge_id}?address=${address}`
  );
  return res.data;
};

// Mark a task as completed
const markCompletedTask = async (address, challenge_id, task_name) => {
  const res = await axios.patch(
    `/api/challenge/${challenge_id}?address=${address}`,
    {
      task_name,
    }
  );

  return res.data;
};

// Reward user for completing a challenge
const rewardChallenge = async (address, challenge_id) => {
  const res = await axios.put(
    `/api/challenge/${challenge_id}?address=${address}`
  );
  return res.data;
};

export {
  createChallenge,
  getAllChallenges,
  getOneChallenge,
  markCompletedTask,
  rewardChallenge,
};
