const passport = require("passport");

module.exports = (app) => {
  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("http://localhost:4000");
    }
  );

  app.get("/auth/getuser", (req, res) => {
    res.send(req.user);
  });

  app.get("/auth/logout", (req, res) => {
    if (req.user) {
      req.logout();
      res.send("done");
    }
  });
};
