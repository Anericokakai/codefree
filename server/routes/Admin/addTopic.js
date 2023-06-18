import express from 'express'
import { topic_collection } from "../../schema/courses/TopicSchema.js"
import { courses_Collection } from "../../schema/courses/course.js"

export const topic_router=express.Router()

topic_router.post('/api/add_topic',async(req,res)=>{
    const{course,topic,author}=req.body
    console.log(req.body)
    const courses_document=await courses_Collection.findOne({course_name:course})
    const course_id=courses_document._id
    console.log(courses_document)
    const add_topic=await topic_collection.create({
        topic:topic,
        author:author,
        course_id:course_id
    })
    if(!add_topic) return res.json({ status: "error", error: "failed to add blog" })
    res.json({ status: "ok", succsess: "topic added succsefully" })
    
})