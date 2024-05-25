import axios from "axios";

const BASE_URL = "http://localhost:1337/api";
export const fetchBlogs = async (blog_id, q) => {
  if (blog_id === undefined && q === undefined) {
    return;
  }
  const res = await axios.get(`${BASE_URL}/${blog_id}?${q}`);
  return res.data;
};

export const fetchSingleBlog = async (blog_id,q) => {
  if (blog_id === undefined ) {
    return;
  }
  console.log(`${BASE_URL}/${blog_id}?${q}`)
  const res = await axios.get(`${BASE_URL}/${blog_id}?${q}`);

  return res.data;
};
