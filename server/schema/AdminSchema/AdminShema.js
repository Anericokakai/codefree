import mongoose from "mongoose";
const Schema=mongoose.Schema
const adminSchema=new Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
   
},
{
    collection:'admins'

})
export const Admincollection=mongoose.model('admins',adminSchema)