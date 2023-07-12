import express from "express";
let router = express.Router();
import axios from "axios";
import { getUserPosts } from "../requests.js";

router.get("/", async function (req, res, next) {
  if (req.user) {
    const posts = await getUserPosts(req.user.username);
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
