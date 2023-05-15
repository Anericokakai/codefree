import { gitcollection } from "../../schema/LessonsSchema/Gitschema.js";
import express from "express";
import multer from "multer";
import path from "path";
fs;
import fs from "fs";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

const git_router = express.Router();
git_router.post("/api/gitroute", async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log("errorr rico" + err);
    } else if (err) {
      console.log(err);
    } else {
      console.log(req.file);
      const { topic, author, samplecode, illustration } = req.body;

      const newBlog = await gitcollection.create({
        topic,
        illustration,
        author,
        samplecode,
        Image: {
          data: fs.readFileSync("uploads/", req.file.filename),
          contentType: "image/png",
        },
        createdate: Date.now(),
      });
      if (newBlog) {
        console.log("blog added successfuly");
      }
      if (!newBlog) {
        console.log("failed to upload image");
      }
    }
  });
});
export default git_router;
