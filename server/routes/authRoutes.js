const passport = require("passport");

module.exports = (app) => {
  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );

  app.get("/auth/getuser", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.status(400).send({
        message: "유저 정보를 찾을 수 없습니다",
      });
    }
  });

  app.get("/auth/logout", (req, res) => {
    if (req.user) {
      req.logout();
      res.status(200).send({
        message: "성공적으로 로그아웃",
      });
    } else {
      res.status(400).send({
        message: "로그아웃할 유저 정보를 찾을 수 없습니다",
      });
    }
  });
};
