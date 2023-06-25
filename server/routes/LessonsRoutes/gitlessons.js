// !import collections

import { courses_Collection } from "../../schema/courses/course.js";

import {Transform} from 'stream'

// todo import express
import express from "express";
import { topic_collection } from "../../schema/courses/TopicSchema.js";
import { blogs_collection } from "../../schema/courses/blogs.js";
import { ObjectId } from "mongodb";
// !routes for the lessons
export const blogs_Router = express.Router();
const githubtutorial = express.Router()
export const javascripttutorials = express.Router();

// !git hub tutorial route
githubtutorial.post("/api/git_tutorials", async (req, res) => {
  
  const { course } = req.body;
  console.log(course);
  const fetch_topics = await courses_Collection.aggregate([
    {
      $lookup: {
        from: "topics",
        localField: "_id",
        foreignField: "course_id",
        as: "topics",
      },
    },
    { $match: { course_name: course } },
    {
      $project: {
        "topics": 1,
      },
    },
  ]);

  if (!fetch_topics) return res.json({ error: "failed to fetch data" });
  res.json(fetch_topics[0].topics);
  // console.log(fetch_topics[0].topics);
});
export default githubtutorial;

// !nodejs tutorials route
blogs_Router.post("/api/blogs", async (req, res) => {

  // !instance of tranform 
  const datatranform= new Transform({objectMode:true})
  datatranform._transform=function(chunck,encoding,callback){

   console.log(chunck)
    callback(null,JSON.stringify(chunck.Blogs))
  }
  const { topic } = req.body;
  console.log('is the topic '+topic);
  console.log(req.body)
   const fetch_topics = await topic_collection.aggregate([
     {
       $lookup: {
         from: "Blogs",
         localField: "_id",
        foreignField: "topic_id",
        as: "Blogs",
      },
     },
     { $match: { topic: topic } },
     {
      $project: {
       "Blogs": 1,
     },
     },
   ]).cursor().pipe(datatranform)
   fetch_topics.pipe(res)
   
  

   if (!fetch_topics) return res.json({ error: "failed to fetch data" });

    

});


export const default_adminBlogs=express.Router()
default_adminBlogs.post("/api/adminblogs", async (req, res) => {

  // !instance of tranform 

  const instancedata= new Transform({objectMode:true})
 instancedata.isWritten=false
  instancedata._transform=function(chunck,encoding,callback){
    if(!this.isWritten){
this.isWritten=true
callback(null,'['+JSON.stringify(chunck))
    }else{
      callback(null,','+JSON.stringify(chunck))
    }
   
  }
  instancedata._flush=function(callback){
callback(null,']')
  }
  const { id } = req.body;

  
  console.log(req.body)
  const blogs=  blogs_collection.find({topic_id:id}).cursor().pipe(instancedata)

blogs.pipe(res)

   
 

    

});





