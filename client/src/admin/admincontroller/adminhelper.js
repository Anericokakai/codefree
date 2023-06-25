


// !date generation function

import { useDispatch } from "react-redux";
import { validateRefreshToken, validToken } from "../../controllers/tokenvalidation";
import { userdetails } from "../../features/UsersSlice";


export const generatedates=()=>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let month = months[d.getMonth()];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


let day = days[d.getDay()];
let year=d.getFullYear()


return `Today is ${day},${month},${year}`
}

// !token validation function
export const ValidateToken_Fucntion=async(token,refreshToken)=>{
    const dispatch = useDispatch();

    // refresh token
    validToken(token).then((data) => {
       
        if (data.data.status === "token expired") {
          validateRefreshToken(refreshToken).then((data) => {
            dispatch(userdetails(data.data.refreshedToken));
          });
        }
      });
}