const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("User");

module.exports = (app) => {
  /* --------------------------------- 프로필 조회 --------------------------------- */

  app.get("/api/user-profile", requireLogin, (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.send(null);
    }
  });

  /* --------------------------------- 회원정보 수정 -------------------------------- */

  // 해시태그 추가,수정
  app.patch("/api/user-profile/hashtag", requireLogin, async (req, res) => {
    try {
      req.user.hashTag = req.body.hashTag;
      await req.user.save();
      res.status(200).send({ message: "성공적으로 저장" });
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // Bio 수정
  app.patch("api/user-profile/bio", requireLogin, async (req, res) => {
    try {
      req.user.bio = req.body.bio;
      await req.user.save();
      res.status(200).send({ message: "성공적으로 저장" });
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // 회원탈퇴
  app.delete("/api/user", requireLogin, (req, res) => {
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

  // hard workers 정보 조회
  app.get("/api/hard-workers", requireLogin, async (req, res) => {
    try {
      const hardWorkers = await User.aggregate([
        {
          $project: {
            githubId: 1,
            githubRepo: 1,
            avatar: 1,
            username: 1,
            bio: 1,
            tier: 1,
            hashTag: 1,
            likeCount: 1,
          },
        },
        { $sort: { likeCount: -1 } },
        { $limit: 3 },
      ]);

      res.json(hardWorkers);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};
