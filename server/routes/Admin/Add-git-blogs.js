import { gitcollection } from "../../schema/LessonsSchema/Gitschema.js";

import express from "express";
import fs from 'fs'
import { add_blog } from "./adminHelper.js";
import { find_topics } from "./adminHelper.js";
// ! import function to upload image
import { uploadImage } from "./adminHelper.js";
const upload=uploadImage()

// !routes to handle all the blogs uploaded
 export const nodejs_router = express.Router();
nodejs_router.post("/api/nodejsroute", upload.single("image"), async (req, res) => {
const heading='nodejs bigginer'
add_blog(req,res,heading)
});


export const javascript_router = express.Router();
javascript_router.post("/api/javascriptroute", upload.single("image"), async (req, res) => {
const heading='javascript bigginer'
add_blog(req,res,heading)
});


 export const react_router = express.Router();
react_router.post("/api/reactroute", upload.single("image"), async (req, res) => {
const heading='react bigginer'
add_blog(req,res,heading)
});


export const git_router = express.Router();
git_router.post("/api/gitroute", upload.single("image"), async (req, res) => {
const heading='github bigginer'
add_blog(req,res,heading)
});

// ! function to fetch the topics from the topics collection
export const fetch_topics =express.Router()

fetch_topics.post('/api/findtopics',async(req,res)=>{
find_topics(req,res)

})
