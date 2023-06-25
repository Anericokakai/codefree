import React from "react";
import { useState } from "react";
import download from "../../images/download.png";
import { apploadedblog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import {
  addCourse,
  AddNewTopic_helper,
} from "../../Pages/lessons/LessonsController/fetchLessons";
function AddTopic({ changeState, course, CourseAdder }) {
  // !state to store topics array
  const [imageld, setImage] = useState("");
  const inputRef = useRef(null);
  // !use states for the inputs

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

  // todo display the image chisen by the author
  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
  }
  const form = document.querySelector("form");
  function handlesubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("course", course);

    // !when its a course function
    if (CourseAdder) {
      if (!imageld) return toast.error("image required");

      const tittle = formData.get("topic");
      const illustration = formData.get("description");
      if (!tittle || !illustration)
        return toast.error("all fields are required required");
      const values = {
        course: formData.get("topic"),
      };
      addCourse(formData).then((data) => {
        console.log(data);
        if (data.data.success) {
          toast.success(data.data.success);
          changeState(false);
        }
        if (data.data.error) {
          toast.error(data.data.error);
          changeState(false);
        }
      });
    } else {
      const values = {
        topic: formData.get("topic"),
        author: formData.get("author"),
        course: formData.get("course"),
      };
      console.log(formData.get("topic"));
      console.log([...formData]);

      if (
        !formData.get("topic") ||
        !formData.get("author" || !formData.get("course"))
      )
        return toast.error("All fields are requird");

      AddNewTopic_helper(values)
        .then((data) => {
          console.log(data);
          if (data.data.success) {
            toast.success(`${data.data.success}`);
            changeState(false);
          }
          if (data.data.error) {
            toast.error(data.data.error);
            changeState(false);
          }
        })
        .catch((error) => {
          toast.error("failed to add blogs");
        });
    }
  }

  // image handlin
  const changeImage = () => {
    inputRef.current.click();
  };

  return (
    <div className="AddTopic_container">
      <div
        className={`form-container TopicsContainer ${
          CourseAdder && "addHight"
        }`}
      >
        <form
          className="Topic_form"
          enctype="multipart/form-data"
          onSubmit={handlesubmit}
        >
          <div className="hideBanner" onClick={() => changeState(false)}>
            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
          </div>
          {CourseAdder ? <h1>Add New Course</h1> : <h1>Add New Topic</h1>}

          <div className="inputs Topics">
            <label htmlFor="">topic </label>
            <input
              type="text"
              name="topic"
              autoComplete="off"
              autoCapitalize="on"
              onChange={handleinputchange}
            />
          </div>

          {CourseAdder ? (
            <></>
          ) : (
            <div className="inputs Topics">
              <label htmlFor="">Author </label>
              <input
                type="text"
                name="author"
                autoComplete="off"
                onChange={handleinputchange}
              />
            </div>
          )}

          {CourseAdder ? (
            <div className="inputs Topics">
              <label htmlFor="">Course Intro </label>
              <textarea
                type="text"
                name="description"
                autoComplete="off"
                onChange={handleinputchange}
              />
            </div>
          ) : (
            <></>
          )}

          {CourseAdder ? (
            <div onClick={changeImage}>
              <input
                type="file"
                name="image"
                id="image"
                ref={inputRef}
                onChange={(e) => handleImageChange(e)}
              />

              {CourseAdder && imageld ? (
                <img
                  className="uploadingImage"
                  src={URL.createObjectURL(imageld)}
                  alt=""
                />
              ) : (
                <img className="uploadingImage" src={download} alt="" />
              )}
            </div>
          ) : (
            <></>
          )}

          <button type="submit " className="submit-blog gap">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTopic;
