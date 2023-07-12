import express from "express";
let router = express.Router();
import { getPostUser, getPost, updatePost, deletePost } from "../requests.js";

router.get("/:id", async function (req, res, next) {
  // console.log(req.params.id);
  try {
    const user = await getPostUser(req.params.id);
    console.log(user);
    // if user is not logged in
    if (req.user === undefined) {
      res.render("error", { errorData: "You need to be logged in." });
    } // if post user doesn't match logged in user
    else if (user.user != req.user.username) {
      // console.log(user.user);
      // console.log(req.user.username);
      res.render("error", { errorData: "You are not the owner of this post." });
    } else {
      // get post so form can be repopulated with post data
      const postContent = await getPost(req.params.id);
      console.log(postContent);
      res.render("edit_post", {
        title: "Classifieds - Edit Post",
        user: req.user,
        id: postContent.id,
        postTitle: postContent.title,
        postBody: postContent.body,
      });
    }
  } catch (err) {
    res.render("error", {
      user: req.user,
    });
  }
});

router.post("/submit/:id", async function (req, res, next) {
  try {
    await updatePost(req.body.id, req.body.title, req.body.body);
    res.redirect("/profile");
  } catch (error) {
    res.render("error", { user: req.user, errorData: "Error editing post" });
  }
});

router.post("/delete/:id", async function (req, res, next) {
  try {
    await deletePost(req.body.id);
    res.redirect("/profile");
  } catch (error) {
    res.render("error", { user: req.user, errorData: "Error deleting post" });
  }
});

export default router;
