import React, { useEffect, useState } from "react";
import javascriptImage from "./homeimages/javascript.png";
import nodeImage from "./homeimages/node.png";
import reactImage from "./homeimages/react.png";
import gitImage from "./homeimages/git.png";
import testavator from "./homeimages/avator2.png";
import { Link } from "react-router-dom";
import ReusablePrealodaer from "../ReusablePrealodaer";
import { fetchCourses_function } from "../../Pages/lessons/LessonsController/fetchLessons";
function SampleCourses() {
  const [coursesBackend, setcourses] = useState([{}]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchCourses_function().then((data) => {
      setcourses(data.data);
      setloading(false);
    });
  }, []);
  function ArrayBuffer(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((bite) => (binary += String.fromCharCode(bite)));

    return window.btoa(binary);
  }

  console.log(coursesBackend);

  return (
    <div>
      {loading ? (
        <div className="preloaderconatiner">
          <ReusablePrealodaer></ReusablePrealodaer>
        </div>
      ) : (
        <main className="Home_Course_container">
          {" "}
          {coursesBackend.map((eachcourse) => {
            return (
              <div className="singleCourse">
                <img src={eachcourse.Image} alt="" />
                <div className="couser_descriptions">
                  <h3>{eachcourse?.course_name}</h3>
                  <p>{eachcourse?.intro}</p>
                  <p>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </p>
                  <div className="readmore">
                    <Link
                      to={`/login/lessonsHome/javascript?course=${eachcourse?.course_name}&heading=${eachcourse?.course_name}`}
                      key={eachcourse.key}
                      className="white"
                    >
                      <strong className="strong">
                        read more <i className="fa-regular fa-bookmark"></i>
                      </strong>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
}

export default SampleCourses;
