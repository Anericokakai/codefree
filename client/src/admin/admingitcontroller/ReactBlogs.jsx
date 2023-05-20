import React from "react";
import AdminNav from "../Admincomponents/AdminNav";
import Tablecomponent from "../Admincomponents/Tablecomponent";

function ReactBlogs() {
  return (
    <div className="admin-container">
      <AdminNav />
      <Tablecomponent
        page="react"
        api="http://localhost:8000/api/reactblogs"
        add_blog_api="http://localhost:8000/api/reactroute"

      ></Tablecomponent>
    </div>
  );
}

export default ReactBlogs;
