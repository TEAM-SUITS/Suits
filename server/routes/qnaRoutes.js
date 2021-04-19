const mongoose = require("mongoose");
const Question = require("../model/Question");
const Answer = require("../model/Answer");
const requireLogin = require("../middlewares/requireLogin");

/* -------------------------------------------------------------------------- */

module.exports = app => {
  // 전체 questions 조회 API
  app.get("/api/questions", async (req, res) => {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
      populate: {
        path: "answers",
        populate: {
          path: "postedby",
        },
      },
    };
    try {
      // find 메서드는 조건에 맞는 document들의 목록을 가져옴.
      const data = await Question.paginate({}, options);
      res.json(data);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // 랜덤 questions 뽑기 API
  app.get("/api/questions/random", async (req, res) => {
    try {
      const count = await Question.countDocuments();
      const randomNumber = Math.ceil(Math.random() * (count - 1));
      await Question.findOne()
        .skip(randomNumber)
        .populate({
          path: "answers",
          populate: {
            path: "postedby",
            model: "User",
          },
        })
        .exec((err, data) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          }
          res.json(data);
        });

      // 또는
      // const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // Trending Question API - answers.length 값 top3인 question 가져오기
  app.get("/api/questions/trend", async (req, res) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
    try {
      const trendingQuestions = await Question.aggregate([
        {
          $project: {
            answers: 1,
            hashTag: 1,
            _id: 1,
            content: 1,
            postedOn: 1,
            postedby: 1,
            lastUpdate: 1,
            length: { $size: "$answers" },
          },
        },

        {
          $lookup: {
            from: "answers",
            localField: "answers",
            foreignField: "_id",
            as: "answers",
          },
        },
        { $unwind: { path: "$answers", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "users",
            localField: "answers.postedby",
            foreignField: "_id",
            as: "answers.postedby",
          },
        },
        {
          $unwind: {
            path: "$answers.postedby",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            content: { $first: "$content" },
            hashTag: { $first: "$hashTag" },
            answers: { $push: "$answers" },
            length: { $first: "$length" },
            lastUpdate: { $first: "$lastUpdate" },
          },
        },
        {
          $match: {
            lastUpdate: { $gte: oneWeekAgo },
          },
        },
        { $sort: { length: -1 } },
        { $limit: 3 },
      ]);
      res.json(trendingQuestions);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // 전달 받은 아이디 값을 가진 question 조회
  app.get("/api/questions/:id", async (req, res) => {
    try {
      const questionId = mongoose.Types.ObjectId(req.params.id);
      await Question.findById(questionId)
        .populate({
          path: "answers",
          populate: {
            path: "postedby",
            model: "User",
          },
        })
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
        message: err,
      });
    }
  });

  // answers field에 전달 받은 아이디 추가하기
  app.patch("/api/questions/:id", async (req, res) => {
    try {
      await Question.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $push: { answers: req.body.answerId },
          $set: { lastUpdate: new Date() },
        },
        { new: true }
      )
        .populate({
          path: "answers",
          populate: {
            path: "postedby",
            model: "User",
          },
        })
        .exec((err, data) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          }
          res.json(data);
        });
      // const question = await Question.findById(req.params.id);
      // question.answers.push(req.body.answerId);
      // question.save();
      // res.json(question);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // answers field에서 아이디 삭제하기

  // 검색어가 포함된 question 조회
  app.get("/api/questions/search/:searchWord", async (req, res) => {
    try {
      const regex = new RegExp(`${req.params.searchWord}+`, "i"); // i for case insensitive
      // const searchQuery = req.params.searchWord.replace(/[.*+?^${}()|[]\]/g, '\$&');
      const questions = await Question.aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "answers",
            foreignField: "_id",
            as: "answers",
          },
        },
        { $unwind: { path: "$answers", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "users",
            localField: "answers.postedby",
            foreignField: "_id",
            as: "answers.postedby",
          },
        },
        {
          $unwind: {
            path: "$answers.postedby",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $group: {
            _id: "$_id",
            content: { $first: "$content" },
            hashTag: { $first: "$hashTag" },
            answers: { $push: "$answers" },
          },
        },
        {
          $match: {
            $or: [
              { answers: { $elemMatch: { content: { $regex: regex } } } },
              { content: { $regex: regex } },
              { hashTag: { $elemMatch: { $regex: regex } } },
            ],
          },
        },
      ]);

      // const questions = await Question.find(
      //   // { status: new RegExp(`${searchQuery}`, 'g') },
      //   // { $text: { $search: req.params.searchWord, $caseSensitive: false } }
      //   { content: { $regex: regex } }
      // );
      // const questions = await Question.find(
      //   { hashTag: { $elemMatch: { $regex: regex } } }
      // );
      res.json(questions);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // 특정 hashtag(s)가 포함된 Q(s) 가져오기
  app.get("/api/questions/following/:hashtags", async (req, res) => {
    // :hashtags -> ex) 'javascript-html-css'
    const hashtagArray = req.params.hashtags.split("-");
    const regexpArray = hashtagArray.map((hashtag) => new RegExp(hashtag, "i"));
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
      populate: {
        path: "answers",
        populate: {
          path: "postedby",
        },
      },
    };

    try {
      const data = await Question.paginate(
        { hashTag: { $elemMatch: { $in: regexpArray } } },
        options
      );
      res.json(data);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

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
        message: err,
      });
    }
  });

  // answers에 새로운 답변 추가하고,
  // 해당 question의 answers 배열에 새로운 답변의 id 추가하기
  app.post("/api/answers", requireLogin, async (req, res) => {
    try {
      const answerData = await new Answer({
        content: req.body.content,
        postedby: req.user,
        question: mongoose.Types.ObjectId(req.body.questionId),
        likes: [],
      }).save();

      Question.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(answerData.question) },
        {
          $push: { answers: answerData._id },
          $set: { lastUpdate: new Date() },
        },
        { new: true }
      ).populate({
        path: "answers",
        populate: {
          path: "postedby",
          model: "User",
        },
      })
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
        message: err,
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
        message: err,
      });
    }
  });

  // delete answer and return question
  app.delete("/api/answers/:id", requireLogin, async (req, res) => {
    try {
      const answer = await Answer.findByIdAndDelete({
        _id: req.params.id,
      }).exec();

      res.json(answer);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // update likes field
};
