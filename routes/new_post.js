import express from "express";
let router = express.Router();
import { newPost } from "../requests.js";

router.get("/", async function (req, res, next) {
  // console.log(req.user);
  res.render("new_post", {
    title: "Classifieds - New Post",
    user: req.user,
  });
});

router.post("/", async function (req, res, next) {
  try {
    await newPost(req.user.username, req.body.title, req.body.body);
    res.redirect("profile");
  } catch (error) {
    res.render("error", { user: req.user, errorData: "Error making post" });
  }
});

export default router;
