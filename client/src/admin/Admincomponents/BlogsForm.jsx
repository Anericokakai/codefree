import React from "react";
import { useState, useRef } from "react";

import { useEffect } from "react";
import { apploadedblog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { fetchTopics } from "../admincontroller/submitBlog";
import download from "../../images/download.png";
function BlogsForm() {
  const [topicName, settopic] = useState([]);
  // !use states for the inputs
  const [imageld, setImage] = useState("");
  const inputRef = useRef(null);
  const [topic, setInputTopic] = useState("");

  const changeImage = () => {
    inputRef.current.click();
  };
  // !function to go back
  function goback() {
    window.history.back();
  }
  // !acces the query string from the url
  const queryParams = new URLSearchParams(window.location.search);

  const course = queryParams.get("course");
  const topicParams = queryParams.get("topic");
const id=queryParams.get('id')
  // todo display the image chisen by the author
  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
  }
  const form = document.querySelector("form");
  function handlesubmit(e) {
    e.preventDefault();

    if (!imageld) return toast.error("image required");

    const formData = new FormData(form);
 formData.append('id',id)

    console.log([...formData]);
    const tittle = formData.get("title");
    const illustration = formData.get("illustration");
    if (!tittle || !illustration)
      return toast.error("all fields are required required");

    apploadedblog(formData)
      .then((data) => {
        console.log(data);
        if (data.data.status && data.data.succsess) {
          toast.success(`${data.data.succsess}`);
        }
      })
      .then(() => {
        // setTimeout(goback, 800);
      })
      .catch((error) => {
        toast.error("failed to add blogs");
      });
  }
  // ! fetch the topics related to the blog
  const courseobj = {
    course: course,
  };
 

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
              <label htmlFor="">tittle </label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                autoCapitalize="on"
              />
            </div>
            <div className="inputs">
              <label htmlFor="">Topic </label>

              <input type="text" value={topicParams} name="topic" />
            </div>

            <div className="inputs choose-img" onClick={changeImage}>
              {imageld ? (
                <img
                  className="uploadingImage"
                  src={URL.createObjectURL(imageld)}
                  alt=""
                />
              ) : (
                <img className="uploadingImage" src={download} alt="" />
              )}
              <input
                type="file"
                name="image"
                id="image"
                ref={inputRef}
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </div>

          <div className="inputs">
            <label htmlFor="">Illustaration </label>
            <textarea type="text" name="illustration" />
          </div>
          <button type="submit" className="submit-blog">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogsForm;
