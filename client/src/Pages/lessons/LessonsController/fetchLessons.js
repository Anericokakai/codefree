import axios from "axios";

export const fetch_lessons = async (api) => {
  const result = await axios.get(api);
  return result;
};
export const fetchTopics_array = async (course) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/git_tutorials",
    course
  );
  return result;
};
export const fetchBlogs_array = async (topic) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/blogs",
    topic
  );
  return result;
};
export const fetchDefaultBlogs = async (topic) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/defaultblog",
    topic
  );
  return result;
};
export const addCourse = async (values) => {
  const result = await axios.post(
    "https://codefreeblogs.onrender.com/api/addcourse",
    values
  );
  return result;
};
