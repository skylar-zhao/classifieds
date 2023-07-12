import express from "express";
import hbs from "express-handlebars";
import passport from "passport";
import session from "express-session";
import connect_sqlite3 from "connect-sqlite3";

// routes
import index from "./routes/index.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import profile from "./routes/profile.js";
import new_post from "./routes/new_post.js";
import edit_post from "./routes/edit_post.js";
import logout from "./routes/logout.js";

const app = express();
const PORT = 3000;

const SQLiteStore = connect_sqlite3(session);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// user session stuff using passport
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./sqlite" }),
  })
);
// "The req.user property is then set to the yielded information."
app.use(passport.authenticate("session"));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use("/", index);
app.use("/signup", signup);
app.use("/login", login);
app.use("/profile", profile);
app.use("/new_post", new_post);
app.use("/edit_post", edit_post);
app.use("/logout", logout);

app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    layoutsDir: "./views/",
  })
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
