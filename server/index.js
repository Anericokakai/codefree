import { topic_collection } from "./schema/courses/TopicSchema.js";

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
import {
  fetch_topics,
  git_router,
  javascript_router,
  nodejs_router,
  react_router,
} from "./routes/Admin/Add-git-blogs.js";

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

// ! topic routes
import { topic_router } from "./routes/Admin/addTopic.js";
// !configuration  of the app
const app = express();
dotenv.config();
console.log(process.env.PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

connection()
  .then(() => {
    console.log(" data base connected succsefully  connected");
  })
  .then(() => {
    app.listen(8000, () => {
      console.log("server listening at port 8000");
    });
  })
  .catch((error) => {
    console.log("failed to connect to db");
    console.log(error);
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
app.use("/api/adminlogin", adminlogin);
// ! admin route for adding admin

app.use(AddAdmin_route);
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
app.use(topic_router)
// !lesson routes
app.use(githubtutorial);
app.use(javascripttutorials);
app.use(reacttutorilas);
app.use(nodejstutorial);
// ! delete blog route

app.use(delete_route);
app.use(fetch_topics);
app.get('/',(req,res)=>res.send('hello'))
