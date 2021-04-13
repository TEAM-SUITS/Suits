const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (app) => {
  /* --------------------------------- 프로필 조회 --------------------------------- */

  app.get("/api/user-profile", (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.send(null);
    }
  });

  /* --------------------------------- 회원정보 수정 -------------------------------- */

  // 해시태그 추가,수정
  app.patch("/api/user-profile/hashtag", async (req, res) => {
    try {
      req.user.hashTag = req.body.hashTag;
      const user = await req.user.save();
      res.status(200).send({ message: "성공적으로 저장" });
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // Bio 수정
  app.patch("api/user-profile/bio", async (req, res) => {
    try {
      req.user.bio = req.body.bio;
      const user = await req.user.save();
      res.status(200).send({ message: "성공적으로 저장" });
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // 회원탈퇴
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
