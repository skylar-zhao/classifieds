import express from "express";
let router = express.Router();
import { getAllPosts } from "../requests.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";

// https://day.js.org/docs/en/plugin/utc
// https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime);
dayjs.extend(utc);

router.get("/", async function (req, res, next) {
  const posts = await getAllPosts();
  for (const post of posts) {
    // //timestamp is stored as utc in db; need to convert to local time
    // post.time = dayjs.utc(post.time).local().format();
    // //then as relative time
    // post.time = dayjs(post.time).fromNow();
    // as one line:
    post.time = dayjs(dayjs.utc(post.time).local().format()).fromNow();
  }
  // console.log(posts);
  res.render("index", {
    title: "Classifieds",
    user: req.user,
    data: posts,
  });
});
export default router;
