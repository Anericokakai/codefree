import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nodejsSchema = new Schema(
  {
    topic: String,
    illustration: String,
    
    Image: {
      data:Buffer,
      contentType:String
    },
    imagepath:String,
    author: String,
    createdate: Date,
  },
  {
    collection: "nodejs_tutorials",
  }
);

export const nodejscollection = mongoose.model("nodejs_tutorials", nodejsSchema);
