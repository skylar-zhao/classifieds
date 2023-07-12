import express from "express";
let router = express.Router();
import passport from "passport";
import LocalStrategy from "passport-local";
import axios from "axios";

// http://www.passportjs.org/tutorials/password/verify/
// adapted code block after
// "Add the following code at line 7 to configure the LocalStrategy."
// since user server doesn't use passport
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    // send user server request to check password using axios to communicate
    try {
      const data = await axios({
        method: "post",
        url: "http://127.0.0.1:5858/password-check",
        data: {
          username: username,
          password: password,
        },
        // auth provided by server
        auth: {
          username: "them",
          password: "D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF",
        },
      });

      // user server will return either:
      // {"check":true,"username":"username"}
      // {"check":false,"username":"username","message":"Incorrect username or password"}
      console.log(data.data);
      if (data.data.check == false) {
        console.log("incorrect pw");
        return cb(null, false, { message: data.data.message });
      } else if (data.data.check == true) {
        console.log("correct pw");
        // instead of returning the row from db in example, we just need the username
        const username = data.data.username;
        return cb(null, { username: username });
      } else {
        console.log("uh oh idk check the user server");
        return cb(null, false, { message: "Idk check the user server" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

router.get("/", function (req, res, next) {
  // console.log(req.user);
  res.render("login", { title: "Classifieds - Log In" });
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login/retry",
  })
);

// if from unsuccessful login
router.get("/retry", function (req, res, next) {
  console.log("login fail");
  res.render("login", { title: "Classifieds - Log In", loginFail: true });
});

// if from successful signup
router.get("/signup_success", function (req, res, next) {
  console.log("yes");
  res.render("login", { title: "Classifieds - Log In", signup: true });
});

export default router;
