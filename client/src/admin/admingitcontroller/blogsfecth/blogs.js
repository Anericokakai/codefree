 import axios from "axios"
export const fetchblogs=async(api)=>{
  

    const results=await axios.get(api)

return results

}
