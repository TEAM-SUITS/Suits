const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
require("./service/passport");

/* ------------------------ env 파일의 환경변수들을 사용할수 있도록 설정 ------------------------ */

dotenv.config();

/* ---------------------------------- DB 연결 --------------------------------- */

try {
  mongoose.connect(
    process.env.MONGO_DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log("Connected to Suits DB")
  );
} catch (error) {
  console.error("Could not Connect to Suits DB", error);
}

/* ------------------------------- DB 모델 불러오기 ------------------------------- */

const User = require("./model/user");
const Question = require("./model/Question");
const Answer = require("./model/Answer");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ADDRESS, credentials: true }));
app.use(morgan("tiny"));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Suits Server Home");
});

/* ----------------------------------- 라우트 ---------------------------------- */

require("./routes/authRoutes")(app);
require("./routes/questionRoutes")(app);
require("./routes/answerRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/quoteRoutes")(app);
require("./routes/likeRoutes")(app);

/* ----------------------------------- 서버 시작 ---------------------------------- */

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Started");
});
