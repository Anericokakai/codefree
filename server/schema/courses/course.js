import mongoose from 'mongoose'
import mogoose from 'mongoose'
const Schema=mogoose.Schema
const courseSchema=new Schema({
    course_name:String,
    
    Image:{
        data:Buffer,
        contentType:String,

    },
    imagepath:String,
    intro:String,
    
},
{
    collection:'courses'
})
export const courses_Collection =mogoose.model('courses',courseSchema)