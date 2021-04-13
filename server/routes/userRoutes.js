const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (app) => {
  app.get("/api/user-profile", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.send(null);
    }
  });

  app.delete("/api/user", (req, res) => {
    User.findOneAndRemove({ _id: req.user._id }, (err) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
      }
      req.logout();
      res.status(200).send({
        message: "성공적으로 삭제",
      });
    });
  });
};
