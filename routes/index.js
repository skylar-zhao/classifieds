import express from "express";
let router = express.Router();
import { getAllPosts } from "../requests.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

router.get("/", async function (req, res, next) {
  const posts = await getAllPosts();
  for (const post of posts) {
    post.time = dayjs(post.time).fromNow();
  }
  console.log(posts);
  res.render("index", {
    title: "Classifieds",
    user: req.user,
    data: posts,
  });
});
export default router;
