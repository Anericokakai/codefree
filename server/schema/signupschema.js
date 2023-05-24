import mongoose from "mongoose";
const Schema = mongoose.Schema;
const signupSchema = new Schema(
  {
    name: {
      type: String,
    },
    email:{
      type:String,
      required:true,
      unique:true
  },
    password: String,
    avator: String,
  },
  {
    collection: "users",
  }
);

export const signupschema = mongoose.model("users", signupSchema);
