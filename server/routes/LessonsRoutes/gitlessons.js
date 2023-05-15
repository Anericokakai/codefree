import { gitcollection } from "../../schema/LessonsSchema/Gitschema.js";
import express from "express";

const githubtutorial = express.Router();
githubtutorial.get("/api/git_tutorials", async (req, res) => {

const lessons= await gitcollection.find() 

if(!lessons)return res.json({error:'failed to retrieve data'})
res.json(lessons)
});
export default githubtutorial;
