import React, { useEffect, useState } from "react";
// import { fetch_lessons } from "../../Pages/lessons/LessonsController/fetchLessons";
import Backdrop from "@mui/material/Backdrop";
import avator from '../../components/home/homeimages/avator2.png'
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  fetchBlogs_array,
  fetchDefaultBlogs,
  fetchTopics_array,
} from "../../Pages/lessons/LessonsController/fetchLessons";
import { Link } from "react-router-dom";
function BlogReusable({ api, course }) {
  const [data, setdata] = useState([]);
  const [spinner, setspinner] = useState(true);
  // todo state to store the topics array
  const [topic, settopic] = useState([]);
  // !store the name of the overal topic
  const[overall,setoverall]=useState('')
  
  // ! store the authors information
  const[author,setauthor]=useState({
    name:'',

  })
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
  

  // !fetch the topics related to each couse
  // todo object to store the course
  const courseobject = {
    course: course,
  };
  
  let deafultBlog;

  // ! fetch all the topics related to that course
  useEffect(() => {
    fetchTopics_array(courseobject)
      .then((data) => {
        
        settopic(data.data);
        console.log(data.data)
        setspinner(false);
       deafultBlog=data.data[0]
      }).then(data=>{

        console.log(deafultBlog)
        fetchBlogs_array(deafultBlog).then((data) => {
          const lessons = data.data;
          console.log(lessons);
           setdata(lessons);
           setspinner(false);
         });

      }

      )
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

 



  // ! fetch topics on click
  const fetchSingleTopic = (topic) => {
    const topicObj = {
      topic: topic,
    };
    
    setoverall(topic)
    console.log(author)
    
    fetchBlogs_array(topicObj).then((data) => {
      
      setdata(data.data);
    });
  };


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
            <h1>Available Topics</h1>
            <ul className={`nav_uls `}>
              {topic.map((single) => {
                return (
                  <li className={`nav_lis `}>
                    <button
                      onClick={(i) => {
                        console.log(single.author)
                        setauthor({
                          name:single.author
                        })
                        console.log('anerico akakai'+single)
                        fetchSingleTopic(single.topic);
                        
                      }}
                    >
                      {single.topic}
                    </button>
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
            <div>
<h1 className="heading">{overall}</h1>
            
            {data.map((singledata) => {
              var base64flag = singledata.Image.contentType;
              var imagesrtng = ArrayBuffer(singledata.Image.data);
              console.log("image strig is" + imagesrtng);
              return (
               
                  
                <div className="main">
             
             <h3 className="heading">{singledata.tittle}</h3>

                  <div className="singleblog_conatiner">
                    <div className="illustration">
                      <p>{singledata.illustration}</p>
                    </div>

                    <div className="imagesample">
                      <img
                        src={`data:${base64flag};base64,${singledata.Image.data}`}
                        alt=""
                      />
                    </div>
               
                  </div>
                </div>
                
              );
            })}
            </div>
          )}
          
        </div>
        <div className="author">
          <div className="author_details">
          <h1>Author</h1>
          <div className="authorImage">
            <img src={avator} alt="" />
          </div>
          <h4>{author.name}</h4>
          <div className="socials">

<div className="icon">
<Link>
 <i className="fa-solid fa-phone" id="icons"></i>
 </Link>
 </div>
 <div className="icon">
 <Link>
 <i class="fa-brands fa-instagram" id="icons"></i>
 </Link>
 </div>
 <div className="icon">
 <Link>
 <i class="fa-brands fa-twitter" id="icons"></i>
 </Link>
 </div>
 <div className="icon">
 <Link>
 <i class="fa-brands fa-linkedin" id="icons"></i>
 </Link>
 </div>
 <div className="icon">
 <Link>
 <i class="fa-brands fa-whatsapp" id="icons"></i>
 </Link>
 </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogReusable;
