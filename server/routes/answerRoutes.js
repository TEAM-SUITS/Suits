const mongoose = require("mongoose");
const Answer = require("../model/Answer");
const requireLogin = require("../middlewares/requireLogin");

/* ------------------------------ export routes ----------------------------- */
module.exports = (app) => {
  // 전체 answers 조회 API
  app.get("/api/answers", async (req, res) => {
    try {
      await Answer.find()
        .populate({ path: "postedby" })
        .exec((err, data) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          }
          res.json(data);
        });
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  });

  // answers에 새로운 답변 추가하고 answer id 반환하기
  app.post("/api/answers", requireLogin, async (req, res) => {
    try {
      await new Answer({
        content: req.body.content,
        postedby: req.user,
        question: mongoose.Types.ObjectId(req.body.questionId),
        likes: []
      }).save((err, data) => {
        if (err) {
          res.status(500).send({
            message: err
          });
        }
        res.json(data);
      });
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  });

  // update answer + answeredQuestions + question
  app.patch("/api/answers/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndUpdate(
        { _id: req.params.id },
        { content: req.body.content },
        { new: true }
      ).exec();

      res.json(answer);
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  });

  // delete answer and return question
  app.delete("/api/answers/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndDelete(
        { _id: req.params.id }
      ).exec();

      res.json(answer);
    } catch (err) {
      res.status(500).send({
        message: err
      });
    }
  });

  // update likes field
};
