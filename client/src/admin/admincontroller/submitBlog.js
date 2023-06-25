import axios from "axios";

export const apploadedblog = async (values) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/nodejsroute",
    values
  );

  return result;
};

export const deleteBlog_function = async (values) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/delete",
    values
  );
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
