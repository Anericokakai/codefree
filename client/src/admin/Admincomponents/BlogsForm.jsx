import React from "react";
import { useState } from "react";
import AdminNav from "./AdminNav";
import { useEffect } from "react";
import { apploadedblog } from "../admincontroller/submitBlog";
import { ToastContainer, toast } from "react-toastify";
import { fetchTopics } from "../admincontroller/submitBlog";
function BlogsForm() {
  const [topicName,settopic]=useState([])
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
  const course=queryParams.get('course')
  console.log(endpoint_api);
  // todo display the image chisen by the author
  function handleImageChange(e) {
    const im = e.target.files[0];
    setImage(im);
  }
  const form = document.querySelector("form");
  function handlesubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);

    console.log([...formData]);

    apploadedblog(formData, endpoint_api)
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
  // ! fetch the topics related to the blog
  const courseobj={
    course:course
  }
useEffect(()=>{
fetchTopics(courseobj).then(data=>{
console.log(data.data)
settopic(data.data)
})

},[])
console.log(topicName)

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
              <label htmlFor="">tittle </label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                autoCapitalize="on"
                onChange={handleinputchange}
                required
              />
            </div>
            <div className="inputs">
              <label htmlFor="">topic that the blog is under </label>
              <div class="dropdown">
  <button class="dropbtn">Topics</button>
  <div class="dropdown-content">
  {
    topicName.map(each=>{
      return (
        <div>
        <p>   <input type="checkbox" value={each.topic}  name='topic'/> {each.topic} </p>
      </div>
      )
    })
  }

   
  </div>
</div>
            </div>

            <div className="inputs choose-img">
              <label htmlFor="image" className="select-img">
                click to select Image <i class="fa-regular fa-image"></i>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                required
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
            <label htmlFor="">Illustaration </label>
            <textarea
              type="text"
              name="illustration"
              onChange={handleinputchange}
              required
            />
            {/*  */}
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
