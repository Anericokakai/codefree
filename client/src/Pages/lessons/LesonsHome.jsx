import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Logout } from "../../features/UsersSlice";
import { useDispatch } from "react-redux";
import { validToken } from "../../controllers/tokenvalidation";
import { validateRefreshToken } from "../../controllers/tokenvalidation";
import { redirectToLogin } from "../../controllers/redirects";
import { userdetails } from "../../features/UsersSlice";
import avator from '../../components/home/homeimages/avator2.png'
import SampleCourses from "../../components/home/SampleCourses";
import Footer from "../../components/Footer";
import NavigationComponent from "../../components/NavigationComponent";
function LesonsHome() {
  const dispatch = useDispatch();
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );
  console.log(token,refreshToken)
  // if user is not loged in  redirect him to log in page
  // if (token === "" || refreshToken === "") {
  //   redirectToLogin();
  // }
  useEffect(() => {
    validToken(token).then((data) => {
      console.log(data);
      if (data.data.status === "token expired") {
        validateRefreshToken(refreshToken).then((data) => {
          dispatch(userdetails(data.data.refreshedToken));
        });
      }
    });
  }, []);


  return (
    <div className="mainCourseContainer">
      <NavigationComponent></NavigationComponent>
      <div className='userinfo'>
      
      <div className="info">
        <h1>CodeFree  </h1>
        <p>A Home for developers</p>
      </div>
     

    </div>
      <div className="parent">
        <h1> Blogs</h1>
        <SampleCourses></SampleCourses>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default LesonsHome;
