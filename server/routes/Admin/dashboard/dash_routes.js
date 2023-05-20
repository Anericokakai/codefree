// !import the schemas for the connection of the dashboards
import { gitcollection } from "../../../schema/LessonsSchema/Gitschema.js";
import { jscollection } from "../../../schema/LessonsSchema/jsschema.js";
import { nodejscollection } from "../../../schema/LessonsSchema/nodejsSchema.js";
import { reactjscollection } from "../../../schema/LessonsSchema/raectSchema.js";
import express from "express";
// ! export routes for the dashboards
export const git_dashboard_route = express.Router();
export const javascript_dashboard_router = express.Router();
export const nodejs_dashboard_route = express.Router();
export const reactjs_dashboard_route=express.Router()

//  !git hub route for the dashboard

git_dashboard_route.get("/api/gitblogs", async (req, res) => {
  const fetch_git_blogs = await gitcollection.find();

  if (!fetch_git_blogs)
    return res.json({ status: 400, error: "failed to fetch blogs" });
  res.json(fetch_git_blogs);
});

// !javascript route for the dashboard

javascript_dashboard_router.get("/api/javascriptblogs", async (req, res) => {
  const fetch_js_blogs = await jscollection.find();
  if (!fetch_js_blogs)
    return res.json({ status: 400, error: "failed to fetch blogs" });
  res.json(fetch_js_blogs);
});
// !node js route for the dashboard

nodejs_dashboard_route.get("/api/nodejsblogs", async (req, res) => {
  const fetch_node_blogs = await nodejscollection.find();
  if (!fetch_node_blogs)
    return res.json({ status: 400, error: "failed to fetch blog" });
  res.json(fetch_node_blogs);
});

// !react js route for the dashboard
reactjs_dashboard_route.get('/api/reactblogs',async(req,res)=>{

    const fetch_reactjs_blogs= await  reactjscollection.find()
    if(!fetch_reactjs_blogs)return res.json({status:400,error:'failed to fetch blogs'})
    res.json(fetch_reactjs_blogs)


})