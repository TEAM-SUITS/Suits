const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../model/user");
const dotenv = require("dotenv");

dotenv.config();

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
      proxy: true,
    },
    function (_, _, profile, cb) {
      console.log(profile);
      // 데이터베이스에서 검색해서 없으면 새로운 User 생성
      User.findOne({ githubId: profile.id }, async (err, doc) => {
        if (err) return cb(err, null);
        if (!doc) {
          const newUser = new User({
            githubId: profile.id,
            avatar: profile._json.avatar_url,
            username: profile.username,
            githubRepo: profile._json.html_url,
            memberSince: new Date(),
          });
          await newUser.save();
          cb(null, newUser);
        }
        cb(null, doc);
      });
    }
  )
);
