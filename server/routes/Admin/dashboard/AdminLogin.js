import { Admincollection } from "../../../schema/AdminSchema/AdminShema.js";
import  Jwt  from "jsonwebtoken";
import bycrpt from 'bcryptjs'
export const adminlogin=async(req,res)=>{

    const{email,password}=req.body

    // !fetch the user with that email
    const user=await Admincollection.findOne({email:email})
    if(!user)return res.json({status:400,error:'user does not exist'})
    // !compare the hashed passord
    const db_password=user.password
    const compare_password= await bycrpt.compare(password,db_password)
    if(!compare_password)return  res.json({status:400,error:'user password dont match'})
    // !create a token 
    const secrete_key = process.env.SECRETE_KEY;
    const refresh_key = process.env.REFRESH_SECRETE_KEY;
    const token= Jwt.sign({email:email},secrete_key,{
        expiresIn:'10s',
        
    })
// !create a refresh token
const refreshtoken=await Jwt.sign({email:email},refresh_key,{
    expiresIn:'1y'
})
// !!send the information to front end
const db_name=user.name
res.json({
    status:200,
    name:db_name,
    token:token,
    refresh_token:refreshtoken
})







}