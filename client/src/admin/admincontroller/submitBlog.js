import axios from "axios";

export const apploadedblog = async (values) => {
  const result = await axios.post("http://localhost:8000/api/gitroute", values);

  return result;
};
