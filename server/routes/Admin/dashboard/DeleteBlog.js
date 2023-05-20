import express from "express";
// !import all the schema modules
import { gitcollection } from "../../../schema/LessonsSchema/Gitschema.js";
import { jscollection } from "../../../schema/LessonsSchema/jsschema.js";
import { nodejscollection } from "../../../schema/LessonsSchema/nodejsSchema.js";
import { reactjscollection } from "../../../schema/LessonsSchema/raectSchema.js";

export const delete_route = express.Router();

delete_route.post("/api/delete_git_blog", async (req, res) => {
  const { collection, id } = req.body;
  switch (collection) {
    case "github":
      const delete_git_blog = await gitcollection.findByIdAndDelete(id);
      if (!delete_git_blog)
        return res.json({ status: 400, result: "failed to delete blog" });
      res.json({ status: 200, result: "blog deleted successfully" });

      break;
    case "javascript":
      const delete_js_blog = await jscollection.findByIdAndDelete(id);
      if (!delete_js_blog)
        return res.json({ status: 400, result: "failed to delete blog" });
      res.json({ status: 200, result: "blog deleted successfully" });
      break;
    case "Node js":
      const delete_node_blog = await nodejscollection.findByIdAndDelete(id);
      if (!delete_node_blog)
        return res.json({ status: 400, result: "failed to delete blog" });
      res.json({ status: 200, result: "blog deleted successfully" });
      break;

    case "react":
      const delete_react_blog = await reactjscollection.findByIdAndDelete(id);
      if (!delete_react_blog)
        return res.json({ status: 400, result: "failed to delete blog" });
      res.json({ status: 200, result: "blog deleted successfully" });
      break;
  }
});
