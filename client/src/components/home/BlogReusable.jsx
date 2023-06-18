import React, { useEffect, useState } from "react";
// import { fetch_lessons } from "../../Pages/lessons/LessonsController/fetchLessons";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { fetchBlogs_array, fetchTopics_array } from "../../Pages/lessons/LessonsController/fetchLessons";
function BlogReusable({ api, course }) {
  const [data, setdata] = useState([]);
  const [spinner, setspinner] = useState(true);
  // todo state to store the topics array
  const [topic, settopic] = useState([]);
  const [image, setimage] = useState([
    {
      img: "",
    },
  ]);

  const fetch_lessons = async (api) => {
    const result = await axios.get(api, {});
    setspinner(true);
    return result;
  };
  // useEffect(() => {
  //   fetch_lessons(api).then((data) => {
  //     const lessons = data.data;
  //     console.log(lessons);
  //     setdata(lessons);
  //     setspinner(false);
  //   });
  // }, []);

  // !fetch the topics related to each couse
  // todo object to store the course
  const courseobject = {
    course: course,
  };
  console.log(courseobject);
  useEffect(() => {
    fetchTopics_array(courseobject)
      .then((data) => {
        console.log(data.data);
        settopic(data.data);
        setspinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(topic);


  // ! fetch topics on click
  const fetchSingleTopic=(topic)=>{
const topicObj={
  topic:topic
}
fetchBlogs_array(topicObj).then(data=>{
  console.log(data.data)
  setdata(data.data)
})


  }
  console.log(data)


  // !todo function to convert buffer image to base 64encoding
  function ArrayBuffer(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((bite) => (binary += String.fromCharCode(bite)));
    return window.btoa(binary);
  }

  return (
    <div>
      <div className="mainlesson_container">
        <div className="lesson_container">
          <div className="lesssonNav">
            <ul className="nav_uls">
              {topic.map((single) => {
                return (
                  <li className="nav_lis">
                    <button onClick={()=>{
                      fetchSingleTopic(single.topic)
                    }}>{single.topic}</button>
                  </li>
                );
              })}
            </ul>
          </div>
          {spinner ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            data.map((singledata) => {
              var base64flag = singledata.Image.contentType;
              var imagesrtng = ArrayBuffer(singledata.Image.data);
              console.log(imagesrtng)
              return (
                <div className="main">
                  <h1 className="heading">{singledata.topic}</h1>

                  <div className="singleblog_conatiner">
                    <div className="illustration">
                      <p>{singledata.illustration}</p>
                    </div>

                    <div className="imagesample">
                      <img
                        src={`data:${base64flag};base64,${imagesrtng}`}
                        alt=""
                      />
                    </div>
                    <div className="athuhor">
                      <h5>
                        {" "}
                        <span className="bold"> Author</span>
                        {singledata.author}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogReusable;
