import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { fetchblogs } from "../admingitcontroller/blogsfecth/blogs";
import { concat } from "../admingitcontroller/blogsfecth/helper";

function Tablecomponent({ page, api, add_blog_api }) {
  const [blogs, setblogs] = useState([]);
  function ArrayBuffer(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((bite) => (binary += String.fromCharCode(bite)));

    return window.btoa(binary);
  }
  useEffect(() => {
    console.log(api);
    fetchblogs(api).then((data) => setblogs(data.data));
  }, []);
  console.log(blogs);

  // !function to delete blog

  
  return (
    <div className="table-container">
      <h1>{page}</h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Illustaration</th>

            <th>image</th>
            <th>author</th>
            <th>created at</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => {
            const illustration = blog.illustration;
            const concated_illustartion = concat(illustration, 50);

            var base64flag = blog.Image.contentType;
            var imagesrtng = ArrayBuffer(blog.Image.data.data);
            return (
              <tr>
                <td>{blog.topic}</td>
                <td>{concated_illustartion}</td>
                <td>
                  <img
                    src={`data:${base64flag};base64,${imagesrtng}`}
                    alt=""
                    width={60}
                    height={60}
                  />
                </td>

                <td> Impedit </td>
                <td>image</td>
                <td>
                  <Link to={"/admin/blogsform"}>
                    <i class="fa-solid fa-pen"></i>
                  </Link>
                  <Link to={`/admin/deleteblog?blog_id=${blog._id}&topic=${blog.topic}&tutorial=${page}`}>
                    <i class="fa-solid fa-trash"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="add_blog_container_btn">
        <Link to={`/admin/blogsform?endpoint_api=${add_blog_api}`}>
          <button className="add_blog">add a new blog</button>
        </Link>
      </div>
    </div>
  );
}

export default Tablecomponent;
