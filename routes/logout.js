import express from "express";
let router = express.Router();
import passport from "passport";

router.get("/", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
export default router;
