import React, { useEffect, useState } from "react";
import AdminNav from "./Admincomponents/AdminNav";
import Tablecomponent from "./Admincomponents/Tablecomponent";

function AdminHome() {
  return (
    <div className="admin-container">
      <AdminNav />
      <Tablecomponent
        page="github"
        api="http://localhost:8000/api/gitblogs"
        add_blog_api="http://localhost:8000/api/gitroute"

      />
    </div>
  );
}

export default AdminHome;
