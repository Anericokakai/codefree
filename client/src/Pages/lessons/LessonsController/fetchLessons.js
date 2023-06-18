import axios from "axios";


export const fetch_lessons=async(api)=>{


    const result=await axios.get(api)
    return result
}
export const fetchTopics_array=async(course)=>{
    const result =await axios.post("http://localhost:8000/api/git_tutorials" ,course)
    return result
}
export const fetchBlogs_array=async(topic)=>{
    const result =await axios.post("http://localhost:8000/api/blogs" ,topic)
    return result
}