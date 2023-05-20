import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reactjsSchema = new Schema(
  {
    topic: String,
    illustration: String,
    
    Image: {
      data:Buffer,
      contentType:String
    },
    author: String,
    createdate: Date,
  },
  {
    collection: "reactjs_tutorials",
  }
);

export const reactjscollection = mongoose.model("reactjs_tutorials", reactjsSchema);
