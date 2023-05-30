import axios from "axios";

export const regiter = async (userdetails) => {
  const response = await axios.post(
    "http://localhost:8000/api/signup",
    userdetails
  );

  return response;
};

export const login = async (values) => {
  const respose_2 = await axios.post("http://localhost:8000/api/login", values);
  return respose_2;
};
export const adminlogin = async (values) => {
  const response = await axios.post(
    "http://localhost:8000/api/adminlogin",
    values
  );
  return response;
};
export const addAdmin = async (values) => {
  const response = await axios.post(
    "http://localhost:8000/api/addAdmin",
    values
  );
  return response;
};
