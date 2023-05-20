import React from "react";
import AdminNav from "../Admincomponents/AdminNav";
import Tablecomponent from "../Admincomponents/Tablecomponent";

function JsBlogs() {
  return (
    <div className="admin-container">
      <AdminNav />
      <Tablecomponent
        page="javascript"
        api="http://localhost:8000/api/javascriptblogs"
        add_blog_api="http://localhost:8000/api/javascriptroute"

      ></Tablecomponent>
    </div>
  );
}

export default JsBlogs;
