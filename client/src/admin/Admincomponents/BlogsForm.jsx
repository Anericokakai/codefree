import React from "react";
import { useState } from "react";
import AdminNav from "./AdminNav";

import { apploadedblog } from "../admincontroller/submitBlog";
function BlogsForm() {
  const [imageld, setImage] = useState("");
  const [otherinputs, setOtherinputs] = useState({
    author: "",
    topic: "",
    samplecode: "",
    illustration: "",
  });
  function handleinputchange(e) {
    const value = e.target.value;
    setOtherinputs({
      ...otherinputs,
      [e.target.name]: value,
    });
  }

  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
    console.log(im);
  }
  const form=document.querySelector('form')
  function handlesubmit(e) {
    e.preventDefault();

const formData= new FormData(form)

console.log([...formData]);

    apploadedblog(formData).then(data=>{
      console.log(data)
    });
  }

  return (
    <div className="admin-container">
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
              />
            </div>
            <div className="inputs">
              <label htmlFor="">Author </label>
              <input
                type="text"
                name="author"
                autoComplete="off"
                onChange={handleinputchange}
              />
            </div>

            <div className="inputs choose-img">
              <label htmlFor="image" className="select-img">
                click to select Image <i class="fa-regular fa-image"></i>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                
                onChange={handleImageChange}
              />
              {/* {aploadimage === "" || aploadimage === null ? (
                ""
              ) : (
                <img width={100} height={100} src={aploadimage} alt="" />
              )} */}
            </div>
          </div>

          <div className="inputs">
            <label htmlFor="">SampleCode </label>
            <textarea
              type="text"
              name="samplecode"
              onChange={handleinputchange}
            ></textarea>
          </div>

          <div className="inputs">
            <label htmlFor="">Illustaration </label>
            <textarea
              type="text"
              name="illustration"
              onChange={handleinputchange}
            />
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
