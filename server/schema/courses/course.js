import mongoose from 'mongoose'
import mogoose from 'mongoose'
const Schema=mogoose.Schema
const courseSchema=new Schema({
    course_name:String,
    
},
{
    collection:'courses'
})
export const courses_Collection =mogoose.model('courses',courseSchema)