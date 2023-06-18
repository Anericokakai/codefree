import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema=mongoose.Schema
const topicSchema=new Schema({
    topic:String,
    author:String,
    course_id:ObjectId,
},
{
    collection:'topics'
})
export const topic_collection=mongoose.model('topics',topicSchema)