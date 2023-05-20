import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jsSchema = new Schema(
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
    collection: "javacript_tutorials",
  }
);

export const jscollection = mongoose.model("javacript_tutorials", jsSchema);
