const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const updateTier = require("../utils/updateTier");
const Answer = mongoose.model("Answer");
const User = mongoose.model("User");

module.exports = (app) => {
  // 한번 좋아요 누른 사람은 못 누도록 처리하는건 클라이언트에서 처리
  // 좋아요 요청시 답변의 like에 요청하는 유저의 아이디를 push (삽입)
  app.put("/api/like/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.user._id } },
        { new: true }
      );
      // 유저의 누적총 좋아요 수 증가
      const user = await User.findByIdAndUpdate(answer.postedby, {
        $inc: { likeCount: 1 },
      });

      // 총 누적수에 따라 등급 업데이트
      updateTier(user);

      res.send(answer);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  app.put("/api/unlike/:id", requireLogin, async (req, res) => {
    // 좋아요 요청시 답변의 like에 요청하는 유저의 아이디를 pull (뺌)
    try {
      const answer = await Answer.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );

      // 유저의 누적총 좋아요 수 감소
      await User.findByIdAndUpdate(answer.postedby, {
        $inc: { likeCount: -1 },
      });

      // 총 누적수에 따라 등급 업데이트
      updateTier(req.user);

      res.send(answer);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};
