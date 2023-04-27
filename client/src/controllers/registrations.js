import axios from "axios";

export const regiter = async (userdetails) => {
  const response = await axios.post(
    "http://localhost:8000/api/signup",
    userdetails
  );

  return response;
};
