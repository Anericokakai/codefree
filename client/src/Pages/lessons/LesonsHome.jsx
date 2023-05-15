import React, { useEffect } from "react";
import Navigation from "../../components/Navigation";
import Firstpage from "../../components/home/Firstpage";
import { useSelector } from "react-redux";
import { Logout } from "../../features/UsersSlice";
import { useDispatch } from "react-redux";
import { validToken } from "../../controllers/tokenvalidation";
import { validateRefreshToken } from "../../controllers/tokenvalidation";
import { redirectToLogin } from "../../controllers/redirects";
import { userdetails } from "../../features/UsersSlice";
import SampleCourses from "../../components/home/SampleCourses";
import Footer from "../../components/Footer";
function LesonsHome() {
  const dispatch = useDispatch();
  const { userName, token, refreshToken } = useSelector(
    (store) => store.userInfo
  );
  if (token === "" && refreshToken === "") {
    redirectToLogin();
  }
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

  const logout = () => {
    dispatch(Logout());
  };

  return (
    <div>
      <Navigation />
      <Firstpage userName={userName}></Firstpage>
      <div>
        <h1>available courses</h1>
        <SampleCourses></SampleCourses>
      </div>
      <button onClick={logout}>logout</button>
      <Footer></Footer>
    </div>
  );
}

export default LesonsHome;
