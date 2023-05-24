import { Admincollection } from "../../../schema/AdminSchema/AdminShema.js";
import express from 'express'
import bycrpt from 'bcryptjs'
 export const AddAdmin_route=express.Router()
AddAdmin_route.post('/api/addAdmin',async(req,res)=>{

const {name,email,password}=req.body
// ! hash the password
const hashed_password= await bycrpt.hash(password,12)

const create_admin= await Admincollection.create({
    name,
    email,
    password:hashed_password

})
if(!create_admin) return res.json({status:400,error:'failed to add a new admin'})
res.json({status:'ok'})

})
