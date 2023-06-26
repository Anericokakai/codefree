
import { topic_collection } from "../../schema/courses/TopicSchema.js";
import { blogs_collection } from "../../schema/courses/blogs.js";

import { courses_Collection } from "../../schema/courses/course.js";


import cloudinary from 'cloudinary'
import * as dotenv from 'dotenv'
dotenv.config()
cloudinary.v2.config(
    {
      cloud_name:process.env.CLOUD_NAME,
      api_key:process.env.API_KEY,
      api_secret:process.env.API_SECRET
    }
  )
  
  let urlPath;
//   !function to upload the image
 export  const uploadImage=async(image)=>{
    const result=await cloudinary.v2.uploader.upload(image,(error,result)=>{
console.log(result)
        urlPath= result.secure_url
    })

  }
// ! add blog function
export const add_blog = async (req, res) => {
  const { title, author, illustration, topic,id ,image} = req.body;
 
  // upload the image first
  uploadImage(image).then(async(data )=>{


      // ! read file path
console.log(topic)
const topics_collection_data = await topic_collection.findOne({
  _id: id,
});
console.log(topics_collection_data);
if (!topics_collection_data ){
  return res.json({
    status: "error",
    error: "cant not find the parent refence id",
  });

}else{

  const newBlog = await blogs_collection.create({
    tittle: title,
    illustration,

    Image:urlPath,
   
    topic_id: topics_collection_data._id,
  });
  if (newBlog) {
    res.json({ status: "ok", succsess: "blog added succsefully" });
  }

  if (!newBlog) {
    res.json({ status: "error", error: "failed to upload blog" });
  }
}
  })

  

};

// todo helper function to fetch all the topics from related blogs
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

  res.json(result[0].topics);
};

// ! function to add course
export const addcourse_helper = async (req, res) => {
  const { course, todelete,image,topic, description} = req.body;


  if (todelete) {
    // !fetch the id of the course
    const couse_id_finder = await courses_Collection.findOne({
      course_name: course,
    });
    if (!couse_id_finder)return res.json({ error: "the course is not available" });

    // !delete topics
    const delete_topics = await topic_collection.findOne({
      course_id: couse_id_finder._id,
    });
    if (delete_topics)return res.json({ error: "failed  to delete the Topics under this course first" });


      //! Delete the course

    
           // !unlink the file
      
          console.log("image deleted");

          const delete_document = await courses_Collection.findOneAndDelete({
            _id: couse_id_finder._id,
          });
          if (!delete_document)
            return res.json({ error: "failed to delete blog" });
          res.json({ success: "Course Deleted" });
        
      
        
      
   
  } else{

  uploadImage(image).then(async(data )=>{
   
    const added = await courses_Collection.create({
      course_name: topic,
      
      intro:description,
  
    Image: urlPath,
     });
  
     if (!added)
       return res.json({ error: "failed to add the course", status: "error" });
  
     res.json({ status: "ok", success: "course added succsefully" });


  })





  
}
};

// !fetch all course from the blogs
export const fetchCourse = async (req, res) => {
  const result = await courses_Collection.find({});
  res.json(result);

};

// !delete blog function
export const Delete_blog_helper = async (req, res) => {
  const { id, path, collection } = req.body;

  switch (collection) {
    case "blogs":
      // !unlink the file
     

          const delete_document = await blogs_collection.findOneAndDelete({
            _id: id,
          });
          if (!delete_document)
            return res.json({ error: "failed to delete blog" });
          res.json({ success: "blog Deleted" });
        
      
      break;

    case "topic":
      const delete_topic = await topic_collection.findOneAndDelete({ _id: id });
      if (!delete_topic) return res.json({ error: "failed to delete topic" });
      const delete_relate_blogs = await blogs_collection.deleteMany({
        topic_id: id,
      });

      if (!delete_relate_blogs)
        return res.json({ error: "failed to delete related blogs" });
      res.json({ success: "Topic deleted" });
      console.log("deleted");
      break;
  }
};

//! Add new topic function

export const Add_new_topic_helper = async (req, res) => {
  const { topic, author, course } = req.body;

  // todo find the course id
  const course_id_finder = await courses_Collection.findOne({
    course_name: course,
  });
  if (!course_id_finder) return res.json({ error: "failed to add topic" });

  // !check if the topic already exist
  const check_existance = await topic_collection.findOne({ topic: topic });
  console.log(check_existance);
  if (check_existance) return res.json({ error: "topic already exist" });
  const add = await topic_collection.create({
    topic: topic,
    author: author,
    course_id: course_id_finder._id,
  });

  if (!add) return res.json({ error: "failed to add blog" });
  res.json({ success: "topic added succesfully", status: 200 });
};


