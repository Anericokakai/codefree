import axios from "axios";

export const apploadedblog = async (values,end_point_api) => {
  const result = await axios.post(end_point_api, values);

  return result;
};

export const deleteBlog=async(api,blog_id)=>{
  const result= await axios.post(api,blog_id)
return result
}