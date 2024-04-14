import React, { useEffect } from "react";
import { useState } from "react";

import {
  fetchCourses_function,
  fetchTopics_array,
} from "../Pages/lessons/LessonsController/fetchLessons";
import "./admin.css";
import {
  generatedates,
  ValidateToken_Fucntion,
} from "./admincontroller/adminhelper";
import { useDispatch, useSelector } from "react-redux";

import { checkIfAdminIsLoggedIn } from "../controllers/protectRoutes";
import { userdetails } from "../features/UsersSlice";
import { Link } from "react-router-dom";
import {
  validateRefreshToken,
  validToken,
} from "../controllers/tokenvalidation";
import DeleteBlog from "./admingitcontroller/DeleteBlog";
import ReusablePrealodaer from "../components/ReusablePrealodaer";
import AddTopic from "./Admincomponents/AddTopic";
function DeafultAdmin() {
  // ! check if the admin is logged in
  const { userName, token, refreshToken, admin } = useSelector(
    (store) => store.userInfo
  );
  checkIfAdminIsLoggedIn(token, refreshToken, admin);

  // !store default values of the  course
  const [courses, setcourse] = useState([]);
  const [topics, settopics] = useState([]);
  const [date, setdate] = useState("");

  const [displayTopicName, setDisplayTopicName] = useState("");
  const [spinner_course, setspinner_course] = useState(true);
  const [topic_spinner, set_topic_spinner] = useState();
  const [displayICons, setDisplayIcons] = useState(false);
  // !show delete banner state
  const [titleCourse, settittlecourse] = useState("");
  const [showdelete, setshowdelete] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);
  // !delete identities
  const [values, setvalues] = useState({
    id: "",
    path: "",
    collection: "",
  });
  // ! fetch courses from backend

  // !call validation of token
  ValidateToken_Fucntion(token, refreshToken);
  useEffect(() => {
    // !generate date
    const date = generatedates();
    setdate(date);

    fetchCourses_function().then((data) => {
      setcourse(data.data);
      setspinner_course(false);
    });
  }, []);

  // !handle topics on click
  const handleClick = (courseName) => {
    const topicOpject = {
      course: courseName,
    };
    set_topic_spinner(true);

    setDisplayTopicName(courseName);
    fetchTopics_array(topicOpject).then((data) => {
      console.log(data);
      settopics(data.data);
      set_topic_spinner(false);
    });
  };
  // !handle deletion of topics
  const handledelete = (info) => {
    setshowdelete(true);
    setvalues({
      id: info?._id,
      path: "",
      collection: "topic",
    });
  };

  console.log(values);

  //! handle couse actions
  const handleCourseActions = () => {
    setDisplayIcons(!displayICons);
  };

  return (
    <div className="DefaultContainer">
      <DeleteBlog
        state={showdelete}
        changeState={setshowdelete}
        values={values}
        course={deleteCourse}
      ></DeleteBlog>
      {deleteCourse && (
        <DeleteBlog
          state={showdelete}
          changeState={setshowdelete}
          values={values}
          course={deleteCourse}
          courseTitle={titleCourse}
        ></DeleteBlog>
      )}
      <div className="topicAddContianer">
        {showAddTopic && (
          <AddTopic
            changeState={setShowAddTopic}
            course={displayTopicName}
          ></AddTopic>
        )}
        {addCourse && (
          <AddTopic changeState={setAddCourse} CourseAdder={true}></AddTopic>
        )}
      </div>

      <header className="defaultHeader">
        <div className="DefaultNav">
          <h1>Hello,{userName}</h1>
          <p>{date}</p>
        </div>
        <div className="Defaultbtn">
          <button onClick={() => setAddCourse(true)}>Add New Course</button>
        </div>
      </header>
      <div className="cont">
        <div className="deafult_course_container">
          {spinner_course ? (
            <div className="spinnerCourse">
              <ReusablePrealodaer></ReusablePrealodaer>
            </div>
          ) : (
            courses?.map((each) => {
              return (
                <div
                  onClick={() => handleClick(each.course_name)}
                  className="default_course"
                >
                  <div className="CourseActions">
                    <div className="dropdown">
                      <p>
                        {" "}
                        <i
                          onClick={() => {
                            handledelete(null);
                            setDeleteCourse(true);
                            settittlecourse(each.course_name);
                          }}
                          className="fa-solid fa-trash"
                        ></i>
                      </p>
                      <p>
                        {" "}
                        <i className="fa-solid fa-pen"></i>
                      </p>
                    </div>
                  </div>
                  <h1>{each.course_name}</h1>
                  <p>10 blogs</p>
                </div>
              );
            })
          )}
        </div>
        <div className="default_topics">
          <div className="default_topics_container">
            <div className="default_topics_one">
              {displayTopicName && (
                <div>
                  <h1> topics under {displayTopicName}</h1>
                  <div className="Defaultbtn">
                    {" "}
                    <button onClick={() => setShowAddTopic(true)}>
                      Add new Topic
                    </button>
                  </div>
                </div>
              )}
              {topic_spinner ? (
                <div className="spinnerContainer">
                  {" "}
                  <ReusablePrealodaer></ReusablePrealodaer>
                </div>
              ) : (
                topics?.map((single) => {
                  return (
                    <div className="default_single_topic">
                      <div className="details">
                        <div className="details_information">
                          <h4>{single.topic}</h4>
                          <p className="light_text">
                            <strong>Author:</strong> {single.author}
                          </p>
                        </div>
                        <div className="detailsActions">
                          <Link to={``}>
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                          <button
                            className="Hide_border"
                            onClick={() => {
                              setDeleteCourse(false);
                              handledelete(single);
                              handleCourseActions();
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <Link
                            to={`/admin/blog?topic=${single.topic}&id=${single._id}&course=${displayTopicName}`}
                          >
                            <i className="fa-regular fa-eye"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="default_topics_one">
              <h1>Actions & Statistics</h1>
              <div className="statistics">
                <Link className="Admin_links" to={"/admin/add_admin"}>
                  {" "}
                  <div className="action">Add Admin</div>
                </Link>
                <div className="action">
                  1800 <small className="light_text">blogs</small>
                </div>
                <div className="action">
                  1800 <small className="light_text">blogs</small>
                </div>
                <div className="action">
                  1800 <small className="light_text">blogs</small>
                </div>
                <div className="action">
                  1800 <small className="light_text">blogs</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeafultAdmin;
