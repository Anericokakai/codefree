import React from "react";
import javascriptImage from "./homeimages/javascript.png";
import nodeImage from "./homeimages/node.png";
import reactImage from "./homeimages/react.png";
import gitImage from "./homeimages/git.png";
import testavator from "./homeimages/avator2.png"
import { Link } from "react-router-dom";
function SampleCourses() {
  const courses = [
    {
      course: "Javascript beginner to advanced",
      image: javascriptImage,
      period: "2hrs 30 mins",
      route: "/login/lessonsHome/javascript",
      key:1,
    },
    {
      course: "Node js beginner to advanced",
      image: nodeImage,
      period: "2hrs 30 mins",
      route: "/login/lessonsHome/Nodejs",
      key:2,
    },
    {
      course: "React beginner to advanced",
      image: reactImage,
      period: "6hrs 30 mins",
      route: "/login/lessonsHome/react",
      key:3,
    },
    {
      course: "Git version control beginner",
      image: gitImage,
      period: "2hrs 30 mins",
      route: "/login/lessonsHome/git",
      key:4,
    }
  ];
  return (
    <main className="course_container">
      {courses.map((eachcourse) => (
        <Link to={eachcourse.route} key={eachcourse.key}>
        
        <div className="courseholder">
          <div className="courses">
            <div className="courseimage">
              <img src={eachcourse.image} alt="" />
            </div>
          </div>
          <div className="descritpions">
            <h3>{eachcourse.course}</h3>
            <p>{eachcourse.period}</p>
            <p>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </p>
          </div>
        </div>
        </Link>
      ))}
    </main>
  );
}

export default SampleCourses;
