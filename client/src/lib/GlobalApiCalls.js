import axios from "axios";

const BASE_URL = "https://codefree-backend.onrender.com/api";
export const fetchBlogs = async (blog_id, q) => {
  if (blog_id === undefined && q === undefined) {
    return;
  }
  const res = await axios.get(`${BASE_URL}/${blog_id}?${q}`);
  return res.data;
};

export const fetchSingleBlog = async (blog_id, q) => {
  if (blog_id === undefined) {
    return;
  }
  console.log(`${BASE_URL}/${blog_id}?${q}`);
  const res = await axios.get(`${BASE_URL}/${blog_id}?${q}`);

  return res.data;
};

export const fetchTopics = async () => {
  const res = await axios.get(`${BASE_URL}/topics`);
  return res.data;
};

export const RegisterUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/auth/local/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
