const mongoose = require("mongoose");
const Question = require("../model/Question");
const Answer = require("../model/Answer");
const User = mongoose.model("User");
const requireLogin = require("../middlewares/requireLogin");

/* -------------------------------------------------------------------------- */

module.exports = (app) => {
  // ✅ 전체 questions 조회 API
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

  // ✅ 랜덤 questions 뽑기 API
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
          res.status(200).send([data]);
        });

      // 또는
      // const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // ✅ Trending Question API - 일주일내에 answers.length 값 top3인 question 가져오기
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

      res.status(200).send(trendingQuestions);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // ✅ 전달 받은 아이디 값을 가진 question 조회
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

  // question의 answers field에서 아이디 삭제하기 → 질문 삭제 시 자동 삭제됨.

  // ✅ 검색어가 포함된 question 조회
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

  // ✅ 특정 hashtag(s)가 포함된 Q(s) 가져오기
  app.get("/api/questions/following/:hashtags", async (req, res) => {
    // :hashtags -> ex) 'javascript+front-end+css'
    const hashtagArray = req.params.hashtags.split("+");
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

  // ✅ 전체 answers 조회 API
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

  // ✅ answers에 새로운 답변 추가하고,
  // 사용자의 answeredQuestions 배열에 답변의 id 추가하고,
  // 해당 question의 answers 배열에 새로운 답변의 id 추가하기
  app.post("/api/answers", requireLogin, async (req, res) => {
    try {
      const answerData = await new Answer({
        content: req.body.content,
        postedby: req.user,
        question: mongoose.Types.ObjectId(req.body.questionId),
        likes: [],
      }).save();

      req.user.answeredQuestions.push(
        mongoose.Types.ObjectId(req.body.questionId)
      );
      await req.user.save();

      Question.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(answerData.question) },
        {
          $push: { answers: answerData._id },
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
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // ✅ 답변 수정(update answer)
  app.patch("/api/answers/:id", requireLogin, async (req, res) => {
    try {
      // 사용자 검증
      const targetAnswer = await Answer.findById(req.params.id);
      if (!targetAnswer.postedby.equals(req.user._id)) {
        res.send({
          message: "수정 권한이 없습니다.",
        });
        return;
      }

      // 수정
      const answer = await Answer.findByIdAndUpdate(
        { _id: req.params.id },
        { content: req.body.content },
        { new: true }
      );

      res.json(answer); // 수정 이후의 질문을 반환함.
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });

  // ✅ 답변 삭제(delete answer)
  app.delete("/api/answers/:id", requireLogin, async (req, res) => {
    try {
      // 삭제하고 하는 답변 먼저 검색
      const answer = await Answer.findById(req.params.id);
      // 권한 확인
      if (!answer.postedby.equals(req.user._id)) {
        res.send({
          message: "삭제 권한이 없습니다.",
        });
        return;
      }

      //질문을 삭제
      await Answer.findByIdAndRemove(req.params.id);

      // 유저가 답변한 질문들 목록에서 삭제
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { answeredQuestions: answer.question } },
        { new: true }
      );

      // 질문의 답변 목록에서 삭제
      await Question.findByIdAndUpdate(
        answer.question,
        { $pull: { answers: answer._id } },
        { new: true }
      );

      res.json(answer); // 삭제 이전의 질문을 반환함.
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: err,
      });
    }
  });
};
