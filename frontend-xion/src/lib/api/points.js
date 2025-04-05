import axios from "axios";

// Use `address` instead of `user_id`
const increasePoints = async (address, updated_points) => {
  const res = await axios.put(`/api/points`, {
    address,
    updated_points,
  });

  return res.data;
};

// Pass address as query param for fetching points
const getPoints = async (address) => {
  const res = await axios.get(`/api/points`, {
    params: {
      address,
    },
  });
  return res.data;
};

export { increasePoints, getPoints };
