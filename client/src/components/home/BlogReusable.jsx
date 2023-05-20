import React, { useEffect, useState } from "react";
import { fetch_lessons } from "../../Pages/lessons/LessonsController/fetchLessons";


function BlogReusable({api}) {
  const [data, setdata] = useState([]);
  const [image, setimage] = useState([
    {
      img: "",
    },
  ]);
  useEffect(() => {
    fetch_lessons(api).then((data) => {
      const lessons = data.data;
      console.log(lessons);
      setdata(lessons);
    });
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
      
      <div className="mainlesson_container">
        <div className="lesson_container">
          <h1></h1>
          {data.map((singledata) => {
            var base64flag = singledata.Image.contentType;
            var imagesrtng = ArrayBuffer(singledata.Image.data.data);

            return (
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
