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
function ReactBlogs() {
  // ! check if the admin is logged in
  const { userName, token, refreshToken, admin } = useSelector(
    (store) => store.userInfo
  );

  checkIfAdminIsLoggedIn(token, refreshToken, admin);
  // ! validate refresh token on expire
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
        page="react"
        api="https://codefreeblogs.onrender.com/api/reactblogs"
        add_blog_api="https://codefreeblogs.onrender.com/api/reactroute"
      ></Tablecomponent>
    </div>
  );
}

export default ReactBlogs;
