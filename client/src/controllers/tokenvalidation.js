import axios from "axios";

export const validToken = async (token) => {
  const response = await axios.post("http://localhost:8000/api/dashboard", {
    token: token,
  });

  return response;
};
export const validateRefreshToken = async (refresh_token) => {
  const refreshed = await axios.post("http://localhost:8000/api/refreshtoken", {
    refresh_token: refresh_token,
  });

  return refreshed;
};
