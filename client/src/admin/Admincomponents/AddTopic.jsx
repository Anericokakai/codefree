import React from "react";
import { useState } from "react";
import download from "../../images/download.png";
import {
  apploadedblog,
  UploadimageToCloudinary,
} from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import {
  addCourse,
  AddNewTopic_helper,
} from "../../Pages/lessons/LessonsController/fetchLessons";
import ReusablePrealodaer from "../../components/ReusablePrealodaer";
function AddTopic({ changeState, course, CourseAdder }) {
  // !prealoder
  const [loading, setloading] = useState();
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
  //! Function to convert the image to base 64
  const ConvertToBAse64 = async (imageld) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(imageld);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const form = document.querySelector("form");
  async function handlesubmit(e) {
    e.preventDefault();
    setloading(true);
    const formData = new FormData(form);
    formData.append("course", course);

    // !when its a course function
    if (CourseAdder) {
      if (!imageld) return toast.error("image required");
      // !call the converter to base 64 function
      const base_64_image = await ConvertToBAse64(imageld);

      await formData.append("image", base_64_image);
      const tittle = formData.get("topic");
      const illustration = formData.get("description");
      if (!tittle || !illustration)
        return toast.error("all fields are required required");

      console.log([...formData]);

      // ! upload image to cloudinary first
      UploadimageToCloudinary(imageld)
        .then((res) => {
          console.log(res);
          const values = {
            course: formData.get("course"),
            description: formData.get("description"),
            image: res.data.secure_url,
            topic: formData.get("topic"),
          };
          // ! addd the course to database

          addCourse(values)
            .then((data) => {
              console.log(data);
              setloading(false);
              if (data.data.success) {
                toast.success(data.data.success);
                changeState(false);
              }
              if (data.data.error) {
                toast.error(data.data.error);
                changeState(false);
                setloading(false);
              }
            })
            .catch((err) => {
              toast.error("server problem");
              setloading(false);
            });
        })
        .catch((error) => {
          toast.error("failed to upload image");
          console.log(error);
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
          setloading(false);
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
          toast.error("server error");
          setloading(false);
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
          {loading && <ReusablePrealodaer></ReusablePrealodaer>}
          <div className="hideBanner" onClick={() => changeState(false)}>
            <i className="fa-sharp fa-solid fa-circle-xmark"></i>
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
