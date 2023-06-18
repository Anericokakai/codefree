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

// !image upload helper function
export const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });

  return upload;
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
      data: fs.readFileSync(req.file.path),
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

// import { gitcollection } from "../../schema/LessonsSchema/Gitschema.js";
// import express from "express";
// import multer from "multer";
// import path from "path";
// fs;
// import fs from "fs";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// const git_router = express.Router();
// git_router.post("/api/gitroute", upload.single("image"), async (req, res) => {
//   const { topic, author, illustration } = req.body;
//   // ! read file path

 
//   const newBlog = await gitcollection.create({
//     topic,
//     illustration,
//     author,

//     Image: {
//       data: fs.readFileSync(req.file.path),
//       contentType: req.file.mimetype,
//     },
//     imagepath:req.file.path,
//     createdate: Date.now(),
//   });
//   if (newBlog) {
//     res.json({ status: "ok", succsess: "blog added succsefully" });
//   }
//   if (!newBlog) {
//     res.json({ status: "error", error: "failed to upload image" });
//   }
// });
// export default git_router;
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
