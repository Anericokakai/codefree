import React from "react";
import { useState } from "react";
import AdminNav from "./AdminNav";

import { apploadedblog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
function AddTopic() {
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
  const queryParams = new URLSearchParams(window.location.search);
  const endpoint_api = queryParams.get("endpoint_api");
  const course= queryParams.get("topic");
  console.log(course);
  // todo display the image chisen by the author
  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
  }
  const form = document.querySelector("form");
  function handlesubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append('course',course)

    const values={
        topic:formData.get('topic'),
        author:formData.get('author'),
        course:formData.get('course')
    }
    console.log(formData.get('topic'))
    console.log([...formData]);

    apploadedblog(values, endpoint_api)
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
        toast.error("failed to add blogs");
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
      <AdminNav />
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
            <div className="inputs">
              <label htmlFor="">Author </label>
              <input
                type="text"
                name="author"
                autoComplete="off"
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

export default AddTopic;
