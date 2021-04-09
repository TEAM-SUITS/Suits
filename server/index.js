const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");

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
    () => console.log("Connected to Suits DB")
  );
} catch (error) {
  console.error("Could not Connect to Suits DB", error);
}

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }));
app.use(morgan("tiny"));

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:4000");
  }
);

app.get("/", (req, res) => {
  res.send("Suits Server Home");
});

app.get("/auth/getuser", (req, res) => {
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
