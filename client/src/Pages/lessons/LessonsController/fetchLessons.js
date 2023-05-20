import axios from "axios";


export const fetch_lessons=async(api)=>{


    const result=await axios.get(api)
    return result
}