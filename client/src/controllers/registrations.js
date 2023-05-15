import axios from "axios";

export const regiter = async (userdetails) => {
  const response = await axios.post(
    "http://localhost:8000/api/signup",
    userdetails
  );

  return response;
};


export const login= async(values)=>{

  const respose_2=await axios.post('http://localhost:8000/api/login',values)
  return respose_2
}
