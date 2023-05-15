import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GitSchema = new Schema(
  {
    topic: String,
    illustration: String,
    samplecode: String,
    Image: {
      data:Buffer,
      contentType:String
    },
    author: String,
    createdate: Date,
  },
  {
    collection: "github_tutorials",
  }
);

export const gitcollection = mongoose.model("github_tutorials", GitSchema);
