import React, { useEffect, useState } from "react";
// import { fetch_lessons } from "../../Pages/lessons/LessonsController/fetchLessons";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
function BlogReusable({ api }) {
  const [data, setdata] = useState([]);
  const[spinner,setspinner]=useState(true)
  const [image, setimage] = useState([
    {
      img: "",
    },
  ]);

  


const fetch_lessons=async(api)=>{


    const result=await axios.get(api)
    setspinner(true)
    return result
}
  useEffect(() => {

    fetch_lessons(api).then((data) => {
      const lessons = data.data;
      console.log(lessons);
      setdata(lessons);
      setspinner(false)
    });
  }, []);
  console.log(spinner)
  
  spinner?console.log('iamge'):console.log('waiting')
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
          <h1></h1>
          {spinner? <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open
  
>
  <CircularProgress color="inherit" />
</Backdrop>:data.map((singledata) => {
            var base64flag = singledata.Image.contentType;
            var imagesrtng = ArrayBuffer(singledata.Image.data.data);
            return singledata=== "" ? 
             <h1>loading</h1>
             : (
              <div>
                <div className="illustration">
                  <h1>{singledata.topic}</h1>
                  <p>{singledata.illustration}</p>
                </div>

                <div className="imagesample">
                  <img src={`data:${base64flag};base64,${imagesrtng}`} alt="" />
                </div>
                <div className="athuhor">
                  <h5>
                    {" "}
                    <span className="bold"> Author</span>
                    {singledata.author}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogReusable;
