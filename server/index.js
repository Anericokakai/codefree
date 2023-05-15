// ! import of the dependencies

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { signuproute ,login_route,validatetoken,refreshToken} from "./routes/registrationroute.js";
import git_router from "./routes/Admin/Update-git-blogs.js";
import connection from "./database/connection.js";
import multer from "multer";
import githubtutorial from "./routes/LessonsRoutes/gitlessons.js";

// !configuration  of the app
const app = express();
dotenv.config();
console.log(process.env.PORT);
const connected=connection()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

connected.then(()=>{
    console.log(' data base connected succsefully  connected')
}).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`app listenng at http://localhost:${process.env.PORT}`);
      });
})

// sign up route

app.post("/api/signup", signuproute);

// login route
app.post("/api/login",login_route)
// validate tokens

app.post('/api/dashboard',validatetoken)
app.post('/api/refreshtoken',refreshToken)
// set up 

//! admin routes
app.use(git_router)
// !lesson routes
app.use(githubtutorial)



