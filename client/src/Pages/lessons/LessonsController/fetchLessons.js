import axios from "axios";


export const fetch_github_lessons=async()=>{


    const result=await axios.get('http://localhost:8000/api/git_tutorials')
    return result
}