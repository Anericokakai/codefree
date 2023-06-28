import React from "react";
import { useState, useRef } from "react";
import {
  apploadedblog,
  UploadimageToCloudinary,
} from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import download from "../../images/download.png";
import ReusablePrealodaer from "../../components/ReusablePrealodaer";
function BlogsForm() {
  const [topicName, settopic] = useState([]);
  // !use states for the inputs
  const [imageld, setImage] = useState("");
  const inputRef = useRef(null);
  const [topic, setInputTopic] = useState("");
  const [loadingImage, setloading] = useState();

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
  const id = queryParams.get("id");

  const illustraton = queryParams.get("illustraton");
  const tittle = queryParams.get("tittle");
  const img = queryParams.get("img");
  const up = queryParams.get("update");

  // !udate blogs
  const [inputs, setInputs] = useState({
    title: tittle,
    illustraton: illustraton,
  });

  // todo display the image chisen by the author
  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
  }
  console.log(up);

  async function handlesubmit(e) {
    e.preventDefault();
    const form = document.querySelector("form");

    const formData = new FormData(form);
    if (!imageld) return toast.error("image required");

    const tittle = formData.get("title");
    const illustration = formData.get("illustration");

    if (!tittle || !illustration)
      return toast.error("all fields are required required");
    setloading(true);
    // Upload image to cloudinary
    if (up) {
      
      UploadimageToCloudinary(imageld).then((data)=>{
        const value = {
          title: tittle,
          topic: formData.get("topic"),
          image: data.data.secure_url,
          illustration: illustration,
          id: id,
          updateblog:up,
        };
        console.log(value)

        apploadedblog(value)
        .then((data) => {
          console.log(data);
          if (data.data.status && data.data.success) {
            setloading(false);
            toast.success(`${data.data.success}`);
          }
        })
        .then(() => {
          setTimeout(goback, 1000);
        })
        .catch((error) => {
          toast.error("failed to add blogs");
        });

      }).catch(error=>{
        toast.error('failed to add image')
        setloading(false)
      })
    } else {
      UploadimageToCloudinary(imageld).then((result) => {
        const values = {
          title: tittle,
          topic: formData.get("topic"),
          image: result.data.secure_url,
          illustration: illustration,
          id: id,
        };
        apploadedblog(values)
          .then((data) => {
            console.log(data);
            if (data.data.status && data.data.success) {
              setloading(false);
              toast.success(`${data.data.success}`);
            }
          })
          .then(() => {
            
             setTimeout(goback, 1000);
          })
          .catch((error) => {
            toast.error("failed to add blogs");
          });
      });
    }
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
          {loadingImage && <ReusablePrealodaer></ReusablePrealodaer>}
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
          {}
          <button type="submit" className="submit-blog">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogsForm;
