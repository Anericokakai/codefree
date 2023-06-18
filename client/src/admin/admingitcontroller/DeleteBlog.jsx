import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteBlog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAdminIsLoggedIn } from "../../controllers/protectRoutes";
import {
  validateRefreshToken,
  validToken,
} from "../../controllers/tokenvalidation";
import { userdetails } from "../../features/UsersSlice";
function DeleteBlog() {
  // ! check if the admin is logged in
  const { userName, token, refreshToken, admin } = useSelector(
    (store) => store.userInfo
  );

  checkIfAdminIsLoggedIn(token, refreshToken, admin);
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
  const queryparams = new URLSearchParams(window.location.search);
  const blog_id = queryparams.get("blog_id");
  const topic = queryparams.get("topic");
  const tutorial = queryparams.get("tutorial");
  const image = queryparams.get("image");
  console.log(blog_id, topic);
  if (!blog_id || !topic) {
    window.location.href = "/";
  }
  const goback = () => {
    window.history.back();
  };
  const Handle_deleteblog = () => {
    const delete_blog_api = "http://localhost:8000/api/delete_git_blog";

    const values = {
      id: blog_id,
      collection: tutorial,
      image: image,
    };

    deleteBlog(delete_blog_api, values)
      .then((data) => {
        console.log(data);

        if (data.data.status === 200) {
          toast.success(`${data.data.result}`);
          setTimeout(goback, 900);
        } else if (data.data.status === 400) {
          toast.error(`${data.data.result}`);
          setTimeout(goback, 900);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed to delete blog");
      });
  };
  return (
    <div className="delete_container">
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={500}
      />
      <div className="delete_banner">
        <h3>Do you want to delete this blog ?</h3>
        <h5>{topic}</h5>
        <div className="btn_container">
          <button className=" btn green" onClick={goback}>
            cancel
          </button>

          <button className=" btn red" onClick={Handle_deleteblog}>
            {" "}
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBlog;
