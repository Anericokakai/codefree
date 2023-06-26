import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteBlog, deleteBlog_function } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { checkIfAdminIsLoggedIn } from "../../controllers/protectRoutes";
import {
  validateRefreshToken,
  validToken,
} from "../../controllers/tokenvalidation";
import { userdetails } from "../../features/UsersSlice";
import {
  addCourse,
  AddNewTopic_helper,
} from "../../Pages/lessons/LessonsController/fetchLessons";
function DeleteBlog({ state, changeState, values, course, courseTitle,id,deleteBlog,collection }) {
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

  const reload = () => {
    window.location.reload();
  };

  const Handle_deleteblog = (values) => {
    //! if deleting couse
    if (course) {
      const values = {
        todelete: true,
        course: courseTitle,
      };
      addCourse(values).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          changeState(false);
        }
        if (res.data.success) {
          changeState(false);
          toast.success(res.data.success);
          setTimeout(reload, 1500);
        }
      });
    } else if(deleteBlog){
      const  data={
        id:id,
        collection:collection
      
        
      
        }

        deleteBlog_function(data).then((data)=>{
changeState(false)
          if(data.data.success){
            toast.success(data.data.success)
            setTimeout(reload,1000)
          } else if(data.data.error){
            toast.error(data.data.error)
          }
        }).catch(error=>{
          toast.error('server failed')
        })



    }
    else {

 

    // !if deleting topic
    deleteBlog_function(values).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
        changeState(false);
      }
      if (response.data.success) {
        console.log(response.data.success);
        changeState(false);
        toast.success(response.data.success);
        setTimeout(reload, 1500);
      }
    });
  }
  };
  return (
    <div>
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={3000}
      />
      <div className={`delete_banner ontop ${state && "showbanner"}`}>
        {course ? (
          <h3>Do you want to delete this course ?</h3>
        ) : (
          <h3>Do you want to delete this Topic ?</h3>
        )}

        <div className="btn_container">
          <button className=" btn green" onClick={() => changeState(false)}>
            cancel
          </button>

          <button
            className=" btn red"
            onClick={() => Handle_deleteblog(values)}
          >
            {" "}
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBlog;
