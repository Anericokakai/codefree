import axios from "axios";

const BASE_URL = "https://codefree-backend.onrender.com/api";
export const fetchBlogs = async (blog_id, q) => {
  if (blog_id === undefined && q === undefined) {
    return;
  }
  const res = await axios.get(`${BASE_URL}/${blog_id}?${q}`);
  return res.data;
};

export const fetchSingleBlog = async (blog_id, id,q) => {
  if (blog_id === undefined && id === undefined) {
    return;
  }
  const res = await axios.get(`${BASE_URL}/${blog_id}/${id}?${q}`);

  return res.data;
};
