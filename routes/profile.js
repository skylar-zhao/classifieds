import express from "express";
let router = express.Router();
import { getUserPosts } from "../requests.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(relativeTime);
dayjs.extend(utc);

router.get("/", async function (req, res, next) {
  if (req.user) {
    const posts = await getUserPosts(req.user.username);
    for (const post of posts) {
      post.time = dayjs(dayjs.utc(post.time).local().format()).fromNow();
    }
    // console.log(posts);
    res.render("profile", {
      title: "Classifieds - Profile",
      user: req.user.username,
      data: posts,
    });
  } else {
    res.redirect("/");
  }
});

export default router;
