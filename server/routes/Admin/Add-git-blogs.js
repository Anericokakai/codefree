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
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const git_router = express.Router();
git_router.post("/api/gitroute", upload.single("image"), async (req, res) => {
  const { topic, author, illustration } = req.body;
  // ! read file path

 
  const newBlog = await gitcollection.create({
    topic,
    illustration,
    author,

    Image: {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    },
    imagepath:req.file.path,
    createdate: Date.now(),
  });
  if (newBlog) {
    res.json({ status: "ok", succsess: "blog added succsefully" });
  }
  if (!newBlog) {
    res.json({ status: "error", error: "failed to upload image" });
  }
});
export default git_router;
