const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Question = mongoose.model("Question");
const Answer = mongoose.model("Answer");
const User = mongoose.model("User");

module.exports = (app) => {
  app.put("/api/like/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.user._id } },
        { new: true }
      ).exec();
      res.send(answer);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  app.put("/api/unlike/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).exec();
      res.send(answer);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};
