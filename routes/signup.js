import express from "express";
let router = express.Router();
import axios from "axios";
import { default as bcrypt } from "bcrypt";

router.get("/", function (req, res, next) {
  // page inaccessible if logged in
  if (res.user != undefined) {
    res.redirect("/");
  } else {
    res.render("signup", { title: "Classifieds - Sign Up" });
  }
});

// hashing the password using bcrypt
router.post("/", async function (req, res, next) {
  const password = await bcrypt.hash(req.body.password, 10);

  try {
    // send request to user server using axios to create user
    const data = await axios({
      method: "post",
      url: "http://127.0.0.1:5858/create-user",
      data: {
        username: req.body.username,
        password: password,
      },
      // auth provided by server
      auth: {
        username: "them",
        password: "D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF",
      },
    });
    res.redirect("/login/signup_success");
  } catch (error) {
    console.log("oh no an error :(");
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    res.render("error", {
      error: error,
      errorData: JSON.stringify(error.response.data),
      user: req.user,
    });
  }
});
export default router;
