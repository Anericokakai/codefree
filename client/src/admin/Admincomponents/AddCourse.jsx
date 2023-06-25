import React from "react";
import { useState } from "react";


import { apploadedblog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { addCourse } from "../../Pages/lessons/LessonsController/fetchLessons";
function AddCourse() {
  // !state to store topics array

  // !use states for the inputs
  const [imageld, setImage] = useState("");
  const [otherinputs, setOtherinputs] = useState({
    author: "",
    topic: "",

    illustration: "",
  });
  // !handle the change of inputs
  function handleinputchange(e) {
    const value = e.target.value;
    setOtherinputs({
      ...otherinputs,
      [e.target.name]: value,
    });
  }
  // !function to go back
  function goback() {
    window.history.back();
  }
  // !acces the query string from the url

  // todo display the image chisen by the author

  const form = document.querySelector("form");
  function handlesubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const values = {
      course: formData.get("topic"),
    };
    console.log(values);

    addCourse(values)
      .then((data) => {
        console.log(data);
        if (data.data.status && data.data.succsess) {
          toast.success(`${data.data.succsess}`);
        }
      })
      .then(() => {
        setTimeout(goback, 800);
      })
      .catch((error) => {
        toast.error("failed to add course");
      });
  }

  return (
    <div className="admin-container">
      <ToastContainer
        position={"top-center"}
        closeOnClick={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        autoClose={500}
      />
      
      <div className="form-container">
        <h1 className="blog-heading">Edit Blogs</h1>
        <form
          action="/api/gitroute"
          className="blogs-form"
          enctype="multipart/form-data"
          onSubmit={handlesubmit}
          method="POST"
        >
          <div className="short-info">
            <div className="inputs">
              <label htmlFor="">topic </label>
              <input
                type="text"
                name="topic"
                autoComplete="off"
                autoCapitalize="on"
                onChange={handleinputchange}
                required
              />
            </div>
          </div>

          <button type="submit " className="submit-blog gap">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
