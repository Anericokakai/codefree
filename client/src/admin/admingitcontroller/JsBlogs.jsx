import React, { useEffect } from "react";
import AdminNav from "../Admincomponents/AdminNav";
import Tablecomponent from "../Admincomponents/Tablecomponent";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAdminIsLoggedIn } from "../../controllers/protectRoutes";
import {
  validateRefreshToken,
  validToken,
} from "../../controllers/tokenvalidation";
import { userdetails } from "../../features/UsersSlice";
function JsBlogs() {
  // ! check if the admin is logged in
  const { userName, token, refreshToken, admin } = useSelector(
    (store) => store.userInfo
  );
  console.log(admin);
  checkIfAdminIsLoggedIn(token, refreshToken, admin);
  // !refresh token on expire
  const dispatch = useDispatch();
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
    <div className="admin-container">
      <AdminNav />
      <Tablecomponent
        page="javascript"
        api="http://localhost:8000/api/javascriptblogs"
        add_blog_api="http://localhost:8000/api/javascriptroute"
        add_topic_api="http://localhost:8000/api/add_topic"
      ></Tablecomponent>
    </div>
  );
}

export default JsBlogs;
