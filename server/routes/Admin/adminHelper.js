import multer from "multer";
import path from "path";

import fs from "fs";
import { topic_collection } from "../../schema/courses/TopicSchema.js";
import { blogs_collection } from "../../schema/courses/blogs.js";

import { courses_Collection } from "../../schema/courses/course.js";

export const deleteFile = async (image, collection, id, res) => {
  res.json({
    status: 400,
    result: "an error occured while deleteing the the file",
  });

  const delete_git_blog = await collection.findByIdAndDelete(id);
  if (!delete_git_blog)
    return res.json({ status: 400, result: "failed to delete blog" });
  res.json({ status: 200, result: "blog deleted successfully" });
};


// ! add blog function
export const add_blog = async (req, res) => {
  const { title, author, illustration, topic } = req.body;
  // ! read file path
  console.log(req.body);

  const topics_collection_data = await topic_collection.findOne({
    topic: topic,
  });
  if (topics_collection_data._id === null || topics_collection_data._id === "")
    return res.json({
      status: "error",
      error: "cant not find the parent refence id",
    });
    

  const newBlog = await blogs_collection.create({
    tittle: title,
    illustration,

    Image: {
      data:await  fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
    imagepath: req.file.path,
    topic_id: topics_collection_data._id,
    
  });
  if (newBlog) {
    res.json({ status: "ok", succsess: "blog added succsefully" });
  }

  if (!newBlog) {
    res.json({ status: "error", error: "failed to upload image" });
  }
};


// ! helper function to fetch all the topics from related blogs
export const find_topics = async (req, res) => {
  const { course } = req.body;
  const result = await courses_Collection.aggregate([
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
        "topics.topic": 1,
      },
    },
  ]);

  console.log(result[0].topics);

  res.json(result[0].topics);
};



 export const addcourse_helper=async(req,res)=>{
const {course}=req.body
const added=await courses_Collection.create(
  {
    course_name:course
  }
)

if(!added)return res.json({error:'failed to add the course',status:'error'})

res.json({status:'ok', succsess: "course added succsefully"})
}


