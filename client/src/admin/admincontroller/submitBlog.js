import axios from "axios";

export const apploadedblog = async (values) => {
  const result = await axios.post(
    "http://localhost:8000/api/nodejsroute",
    values
  );

  return result;
};

export const deleteBlog_function = async (values) => {
  const result = await axios.post("http://localhost:8000/api/delete", values);
  return result;
};

// !function to fetch all the topics
export const fetchTopics = async (values) => {
  const response = await axios.post(
    "http://localhost:8000/api/findtopics",
    values
  );
  return response;
};

// ! add image function

const cloudinaryurl = "https://api.cloudinary.com/v1_1/dlobwfi13/upload";
const cloudinarypreset = "crhyoowp";

export const UploadimageToCloudinary = async (file) => {
  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("upload_preset", cloudinarypreset);
  const result = await axios({
    url: cloudinaryurl,
    method: "POST",

    Headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formdata,
  });
  return result;
};
