import express from "express";

// !import all the schema modules

// ! import helper
import { deleteFile } from "../adminHelper.js";
export const delete_route = express.Router();

delete_route.post("/api/delete_git_blog", async (req, res) => {
  // const { collection, id, image } = req.body;
  // switch (collection) {
  //   case "github":
  //     deleteFile(image, gitcollection, id, res);

  //     break;
  //   case "javascript":
  //     deleteFile(image, jscollection, id, res);

  //     break;
  //   case "Node js":
  //     deleteFile(image, nodejscollection, id, res);

  //     break;

  //   case "react":
  //     deleteFile(image, reactjscollection, id, res);

  //     break;
  // }
});
