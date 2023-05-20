// !impor collections
import { nodejscollection } from "../../schema/LessonsSchema/nodejsSchema.js";
import { reactjscollection } from "../../schema/LessonsSchema/raectSchema.js";
import { jscollection } from "../../schema/LessonsSchema/jsschema.js";
import { gitcollection } from "../../schema/LessonsSchema/Gitschema.js";

// todo import express
import express from "express";
// !routes for the lessons
export const nodejstutorial = express.Router();
 const githubtutorial = express.Router();
export const reacttutorilas=express.Router()
export const javascripttutorials=express.Router()

// !git hub tutorial route
githubtutorial.get("/api/git_tutorials", async (req, res) => {
  const lessons = await gitcollection.find();

  if (!lessons) return res.json({ error: "failed to fetch data" });
  res.json(lessons);
});
export default githubtutorial

// !nodejs tutorials route
nodejstutorial.get("/api/nodejs_tutorials", async (req, res) => {

    const lessons= await  nodejscollection.find()
    if(!lessons)return res.json({error:'failed to fetch data '})
    res.json(lessons)
});

// !reactjs tutorials route

reacttutorilas.get('/api/react_tutorials',async(req,res)=>{
const lesson=await reactjscollection.find()
if(!lesson)return res.json({error:'failed to fetch data'})
res.json(lesson)
})
// !javascript tutorials routes

javascripttutorials.get('/api/javascript_tutorials',async(req,res)=>{
    const lesson= await jscollection.find()
    if(!lesson)return res.json({error:'failed to fetch data '})
    res.json(lesson)
})


