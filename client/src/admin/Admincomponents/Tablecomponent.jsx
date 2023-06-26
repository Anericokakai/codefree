import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DeleteBlog from "../admingitcontroller/DeleteBlog";

function Tablecomponent({ blogs }) {
  const [showdelete, setshowdelete] = useState(false);
  const [id, setid] = useState("");

  function ArrayBuffer(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((bite) => (binary += String.fromCharCode(bite)));

    return window.btoa(binary);
  }

  console.log(blogs);
  // !function to delete blog

  return (
    <div className="table-container">
      <DeleteBlog
        state={showdelete}
        changeState={setshowdelete}
        deleteBlog={true}
        collection="blogs"
        id={id}
      ></DeleteBlog>
      <h1></h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Illustaration</th>

            <th>image</th>
            <th>author</th>
            <th>created at</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs &&
            blogs?.map((single) => {
              var base64flag = single?.Image?.contentType;

              const concatFunction = (str, n) => {
                return str?.length > n
                  ? str.substring(0, n - 1) + "....."
                  : str;
              };

              return (
                <tr>
                  <td>{single?.tittle}</td>
                  <td>{concatFunction(single?.illustration, 100)}</td>
                  <td>
                    <img src={single.Image} alt="" width={60} height={60} />
                  </td>

                  <td> Impedit </td>
                  <td>image</td>
                  <td>
                    <Link to={"/admin/blogsform"}>
                      <i class="fa-solid fa-pen"></i>
                    </Link>
                    <button
                      className="Hide_border"
                      onClick={() => {
                        setshowdelete(true);
                        setid(single._id);
                      }}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <div className="add_blog_container_btn">
        <Link
          to={`/admin/blogsform?endpoint_api=${add_blog_api}&&course=${page}`}
        >
          <button className="add_blog">add a new blog</button>
        </Link>
        <Link
          to={`/admin/blogsform/topic?endpoint_api=https://codefreeblogs.onrender.com/api/add_topic&topic=${page}`}
        >
          <button className="add_blog gap">add a new topic</button>
        </Link>
      </div> */}
    </div>
  );
}

export default Tablecomponent;
