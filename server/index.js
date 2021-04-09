const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy;
const User = require("./model/user");

/* ------------------------ env 파일의 환경변수들을 사용할수 있도록 설정 ------------------------ */

dotenv.config();

/* ---------------------------------- DB 연결 --------------------------------- */

try {
  mongoose.connect(
    process.env.MONGO_DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Connected To Suits DB")
  );
} catch (error) {
  console.error("Could not Connect to Suits DB", error);
}

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }));

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      callbackURL: "/auth/github/callback",
    },
    function (_, _, profile, cb) {
      console.log(profile);
      // 데이터베이스에서 검색해서 없으면 새로운 User 생성
      User.findOne({ githubId: profile.id }, async (err, doc) => {
        if (err) return cb(err, null);
        if (!doc) {
          const newUser = new User({
            githubId: profile.id,
            username: profile.username,
          });
          await newUser.save();
          cb(null, newUser);
        }
        cb(null, doc);
      });
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" })
);

app.get("/", (req, res) => {
  res.send("Suits Server Home");
});

app.get("auth/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Started");
});
