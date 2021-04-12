module.exports = (app) => {
  app.get("/api/user-profile", (req, res) => {
    res.send(req.user);
  });
};
