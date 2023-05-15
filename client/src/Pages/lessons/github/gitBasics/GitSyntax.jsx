import React, { useEffect, useState } from "react";
import { fetch_github_lessons } from "../../LessonsController/fetchLessons";


function GitSyntax() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch_github_lessons().then((data) => {
      const lessons = data.data;
      console.log(lessons);
      setdata(lessons);
    });
  }, []);
  return (
    <div>
      {
        // map the object from the backed to frontend
        data.map((singleData) => {
          const base64Image = btoa(
            String.fromCharCode(...new Uint8Array(singleData.Image.data.data))
          );


        return  <div>

          <div id="overflowTest">
        <code>{singleData.samplecode}</code>
      </div>
      <img src={`data:${singleData.Image.contentType};base64,${singleData.Image.data.data.toString('base64')}`} alt="" width={100} height={100} />
      </div>
        })
      }

      
    </div>
  );
}

export default GitSyntax;
