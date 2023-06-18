import axios from "axios";

export const apploadedblog = async (values, end_point_api) => {
  const result = await axios.post(end_point_api, values);

  return result;
};

export const deleteBlog = async (api, blog_id) => {
  const result = await axios.post(api, blog_id);
  return result;
};

// !function to fetch all the topics
export const fetchTopics = async (values) => {
  const response = await axios.post(
    "https://codefreeblogs.onrender.com/api/findtopics",
    values
  );
  return response;
};
