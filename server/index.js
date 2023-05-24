// ! import of the dependencies for configurations

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {
  signuproute,
  login_route,
  validatetoken,
  refreshToken,
} from "./routes/registrationroute.js";
import connection from "./database/connection.js";
import multer from "multer";

// !blogs routes for the tables in the admin
import git_router from "./routes/Admin/Add-git-blogs.js";
import javascript_router from "./routes/Admin/Add-js-blogs.js";
import nodejs_router from "./routes/Admin/Add-nodejs-blogs.js";
import react_router from "./routes/Admin/Add-react-blogs.js";

// !blogs routes for the lessons

import githubtutorial from "./routes/LessonsRoutes/gitlessons.js";
import { reacttutorilas } from "./routes/LessonsRoutes/gitlessons.js";
import { javascripttutorials } from "./routes/LessonsRoutes/gitlessons.js";
import { nodejstutorial } from "./routes/LessonsRoutes/gitlessons.js";
// !dashboard routes for the admins
// !import delete blog route
import { delete_route } from "./routes/Admin/dashboard/DeleteBlog.js";
import { adminlogin } from "./routes/Admin/dashboard/AdminLogin.js";
import { AddAdmin_route } from "./routes/Admin/dashboard/addAdmin.js";
import {
  git_dashboard_route,
  javascript_dashboard_router,
  nodejs_dashboard_route,
  reactjs_dashboard_route,
} from "./routes/Admin/dashboard/dash_routes.js";

// !configuration  of the app
const app = express();
dotenv.config();
console.log(process.env.PORT);
const connected = connection();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

connected
  .then(() => {
    console.log(" data base connected succsefully  connected");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app listenng at http://localhost:${process.env.PORT}`);
    });
  });

// !sign up route for the client

app.post("/api/signup", signuproute);

// !login route for the client
app.post("/api/login", login_route);
// !validate tokens

app.post("/api/dashboard", validatetoken);
app.post("/api/refreshtoken", refreshToken);
// set up

// ! admin route for login
app.use('/api/adminlogin',adminlogin)
// ! admin route for adding admin

app.use(AddAdmin_route)
//! admin routes for the dashboard


app.use(git_dashboard_route);
app.use(javascript_dashboard_router);
app.use(nodejs_dashboard_route);
app.use(reactjs_dashboard_route);

// todo admin routes for creating a new blog
app.use(git_router);
app.use(javascript_router);
app.use(nodejs_router);
app.use(react_router);
// !lesson routes
app.use(githubtutorial);
app.use(javascripttutorials);
app.use(reacttutorilas);
app.use(nodejstutorial);
// ! delete blog route

app.use(delete_route);
