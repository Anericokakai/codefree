import express from "express";
import fs from "fs";
import { addcourse_helper, add_blog, Add_new_topic_helper, Delete_blog_helper, fetchCourse } from "./adminHelper.js";
import { find_topics } from "./adminHelper.js";
import multer from "multer";
import path from "path";




// !routes to handle all the blogs uploaded
export const nodejs_router = express.Router();
nodejs_router.post(
  "/api/nodejsroute",
  
  async (req, res) => {
    const heading = "nodejs bigginer";
    add_blog(req, res);
  }
);

export const javascript_router = express.Router();
javascript_router.post(
  "/api/javascriptroute",
  
  async (req, res) => {
    add_blog(req, res);
  }
);

export const react_router = express.Router();
react_router.post(
  "/api/reactroute",

  async (req, res) => {
    add_blog(req, res);
  }
);

export const git_router = express.Router();
git_router.post("/api/gitroute", async (req, res) => {
  add_blog(req, res);
});

// ! function to fetch the topics from the topics collection
export const fetch_topics = express.Router();

fetch_topics.post("/api/findtopics", async (req, res) => {
  find_topics(req, res);
});

// ! add course a new course
export const addcourse=express.Router()
addcourse.post("/api/addcourse",async(req,res)=>{


  addcourse_helper(req,res)
})
// ! delete a course


// !add new topic function
 export const Add_topic_Route=express.Router()
Add_topic_Route.post('/api/addtopic',async(req,res)=>{

  Add_new_topic_helper(req,res)
})


//! fetch all courses
addcourse.get('/api/fetchcourse',(req,res)=>{
  fetchCourse(req,res)
})
export const DeleteBlog_Ruote=express.Router()
DeleteBlog_Ruote.post('/api/delete',(req,res)=>{

  Delete_blog_helper(req,res)
})