import Tablecomponent from "./Admincomponents/Tablecomponent";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAdminIsLoggedIn } from "../controllers/protectRoutes";
import {
  validateRefreshToken,
  validToken,
} from "../controllers/tokenvalidation";
import { userdetails } from "../features/UsersSlice";

// <div className="admin-container">
//   <AdminNav />
//   <Tablecomponent
//     page="github"
//     api="http://localhost:8000/api/gitblogs"
//     add_blog_api="http://localhost:8000/api/gitroute"
//   />
// </div>

import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";
import ReusablePrealodaer from "../components/ReusablePrealodaer";
import { fetchAdminBlogd_function } from "../Pages/lessons/LessonsController/fetchLessons";

import { Link } from "react-router-dom";

function AdminHome() {
  // ! check if the admin is logged in
  const { userName, token, refreshToken, admin } = useSelector(
    (store) => store.userInfo
  );
  checkIfAdminIsLoggedIn(token, refreshToken, admin);
  // //! validate refresh token
  const dispatch = useDispatch();
  useEffect(() => {
    validToken(token).then((data) => {
      if (data.data.status === "token expired") {
        validateRefreshToken(refreshToken).then((data) => {
          dispatch(userdetails(data.data.refreshedToken));
        });
      }
    });
  }, []);
  const [data, setdata] = useState([]);
  const [spinner, setspinner] = useState(true);
  // todo state to store the topics array
  const [topic, settopic] = useState([{}]);
  // !store the name of the overal topic

  // ! acces the query stream
  const queryStirng = new URLSearchParams(window.location.search);

  let course = queryStirng.get("course");
  let topicparams = queryStirng.get("topic");
  const id = queryStirng.get("id");

  // !fetch the topics related to each couse
  // todo object to store the course

  // ! fetch all the topics related to that course
  const topic_objj = {
    id: id,
  };
  useEffect(() => {
    fetchAdminBlogd_function(topic_objj).then((data) => {
      console.log(data.data);
      settopic(data.data);
      setspinner(false);
    });

    console.log(topic);
  }, []);

  // !todo function to convert buffer image to base 64encoding
  function ArrayBuffer(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((bite) => (binary += String.fromCharCode(bite)));
    return window.btoa(binary);
  }

  return (
    <div>
      <div>
        <header className="defaultHeader">
          <div className="DefaultNav">
            <h1>Hello,{userName}</h1>
          </div>
          <div className="Defaultbtn">
            <Link
              to={`/admin/blogsform?course=${course}&topic=${topicparams}&id=${id}`}
            >
              {" "}
              <button>Add New Blog</button>
            </Link>
          </div>
        </header>
        <div className="default_blogs_header">
          <h1>{course} Blogs</h1>
          {spinner ? (
            <div className="spinnerContainer">
              <ReusablePrealodaer></ReusablePrealodaer>
            </div>
          ) : (
            <Tablecomponent blogs={topic} topic={course}></Tablecomponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
