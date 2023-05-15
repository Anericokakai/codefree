import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import JavascriptSyntax from "../Pages/lessons/javascript/javascriptBasics/JavascriptSyntax";
import LesonsHome from "../Pages/lessons/LesonsHome";
import GitSyntax from "../Pages/lessons/github/gitBasics/GitSyntax";
import NodejsSyntax from "../Pages/lessons/nodejs/nodejsBasics/NodejsSyntax";
import ReactBasics from "../Pages/lessons/react/ReactBasics/ReactBasics";
import AdminHome from "../admin/AdminHome";
import JsBlogs from "../admin/admingitcontroller/JsBlogs";
import NodejsBlogs from "../admin/admingitcontroller/NodejsBlogs";
import ReactBlogs from "../admin/admingitcontroller/ReactBlogs";
import BlogsForm from "../admin/Admincomponents/BlogsForm";

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
    path: "/login/lessonsHome/Nodejs",
    element: <NodejsSyntax />,
  },
  {
    path: "/login/lessonsHome/react",
    element: <ReactBasics />,
  },
  {
    path: "/login/lessonsHome/git",
    element: <GitSyntax />,
  },
  {
    path: "/admin/git",
    element: <AdminHome />,
  },
  {
    path: "/admin/javascript",
    element: <JsBlogs />,
  },
  {
    path: "/admin/nodejs",
    element: <NodejsBlogs />,
  },
  {
    path:'/admin/react',
    element:<ReactBlogs/>
  },
  {
    path:'/admin/blogsform',
    element:<BlogsForm/>
    
  }
];
export default generalroutes;
