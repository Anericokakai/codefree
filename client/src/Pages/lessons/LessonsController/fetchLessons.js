import axios from "axios";

export const fetch_lessons = async (api) => {
  const result = await axios.get(api);
  return result;
};
export const fetchTopics_array = async (course) => {
  const result = await axios.post(
    "http://localhost:8000/api/git_tutorials",
    course
  );
  return result;
};
export const fetchBlogs_array = async (topic) => {
  const result = await axios.post("http://localhost:8000/api/blogs", topic);
  return result;
};
export const fetchDefaultBlogs = async (topic) => {
  const result = await axios.post(
    "http://localhost:8000/api/defaultblog",
    topic
  );
  return result;
};

// ! add course function
export const addCourse = async (values) => {
  const result = await axios.post(
    "http://localhost:8000/api/addcourse",
    values
  );
  return result;
};
// !fetch courses function
export const fetchCourses_function = async () => {
  const result = await axios.get("http://localhost:8000/api/fetchcourse");
  return result;
};
export const fetchAdminBlogd_function = async (topic) => {
  const result = await axios.post(
    "http://localhost:8000/api/adminblogs",
    topic
  );
  return result;
};

// ! add new Topic function
export const AddNewTopic_helper = async (values) => {
  const res = await axios.post("http://localhost:8000/api/addtopic", values);
  return res;
};
