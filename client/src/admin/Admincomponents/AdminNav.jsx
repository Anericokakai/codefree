import React from "react";
import { Link, NavLink } from "react-router-dom";
import admin from "./admin.jpeg";
import { checkIfAdminIsLoggedIn } from "../../controllers/protectRoutes";
import { useSelector } from "react-redux";
function AdminNav() {

  return (
    <nav className="admin-nav">
      <div className="admin-logo">
        <h1>
          <span className="hidden-large">CF</span>                                                                                                              
          <span className="hidden-small">code free</span>
        </h1>
      </div>
      <ul>
        <NavLink
          to={"/admin/git"}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <i class="fa-brands fa-github"></i>
          <span className="hidden-small">Git Blogs</span>
        </NavLink>

        <NavLink
          to={"/admin/javascript"}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <i class="fa-brands fa-square-js"></i>
          <span className="hidden-small">Javascript Blogs</span>
        </NavLink>

        <NavLink
          to={"/admin/nodejs"}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <i class="fa-brands fa-node"></i>
          <span className="hidden-small">Nodejs Blogs</span>
        </NavLink>

        <NavLink
          to={"/admin/react"}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <i class="fa-brands fa-react"></i>
          <span className="hidden-small">React Blogs </span>
        </NavLink>
      </ul>
      <div className="logedin-admin">
        <div className="admin-image">
          <img src={admin} alt="" />
        </div>
        <div className="amin-name">
          <h3 className="hidden-small">Abigael bbg</h3>
        </div>
      </div>
      <Link to={"/admin/add_admin"}>
                                                                                                                      
        <button className="add"> add admin</button>
      </Link>
    </nav>
  );
}

export default AdminNav;
