import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
const Shema=mongoose.Schema

const blog_Schema=new Schema({
    tittle:String,
    Image:String,
    illustration:String,
    topic_id:ObjectId,
    imagepath:String,
},

{
    collection:'Blogs'
})
export const blogs_collection=mongoose.model('Blogs',blog_Schema)