import React from "react";
import AdminNav from "../Admincomponents/AdminNav";
import Tablecomponent from "../Admincomponents/Tablecomponent";

function NodejsBlogs() {
  return (
    <div className="admin-container">
      <AdminNav />
      <Tablecomponent
        page="Node js"
        api="http://localhost:8000/api/nodejsblogs"
        add_blog_api="http://localhost:8000/api/nodejsroute"

      ></Tablecomponent>
    </div>
  );
}

export default NodejsBlogs;
