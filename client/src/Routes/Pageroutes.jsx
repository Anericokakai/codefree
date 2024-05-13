
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import JavascriptSyntax from "../Pages/lessons/javascript/javascriptBasics/JavascriptSyntax";
import LesonsHome from "../Pages/lessons/LesonsHome";

import AdminHome from "../admin/AdminHome";

import BlogsForm from "../admin/Admincomponents/BlogsForm";
import DeleteBlog from "../admin/admingitcontroller/DeleteBlog";
import AdminLogin from "../Pages/AdminLogin";
import AddAdmin from "../admin/Admincomponents/AddAdmin";
import AddTopic from "../admin/Admincomponents/AddTopic";
import AddCourse from "../admin/Admincomponents/AddCourse";
import DeafultAdmin from "../admin/DeafultAdmin";
import { Home } from "../features/Home";

const generalroutes = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login/lessonsHome",
    element: <LesonsHome />,
  },
  {
    path: "/login/lessonsHome/javascript",
    element: <JavascriptSyntax />,
  },

  {
    path: "/admin/blog",
    element: <AdminHome />,
  },

  {
    path: "/admin/blogsform",
    element: <BlogsForm />,
  },
  {
    path: "/admin/blogsform/topic",
    element: <AddTopic></AddTopic>,
  },
  {
    path: "/admin/deleteblog",
    element: <DeleteBlog />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/add_admin",
    element: <AddAdmin></AddAdmin>,
  },
  {
    path: "/admin/addcourse",
    element: <AddCourse></AddCourse>,
  },
  { path: "/admin/default", element: <DeafultAdmin></DeafultAdmin> },
];
export default generalroutes;
