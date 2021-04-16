const mongoose = require("mongoose");
const Question = require("../model/Question");

/* ------------------------------ export routes ----------------------------- */
module.exports = (app) => {
  // 전체 questions 조회 API
  app.get("/api/questions", async (req, res) => {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
      populate: "answers",
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
        .populate({ path: "answers" })
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
    try {
      const trendingQuestions = await Question.aggregate([
        {
          $project: {
            answers: 1,
            hashTag: 1,
            _id: 1,
            content: 1,
            postedOn: 1,
            length: { $size: "$answers" },
          },
        },
        { $sort: { length: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "answers",
            localField: "answers",
            foreignField: "_id",
            as: "answers",
          },
        },
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
        .populate({ path: "answers" })
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
      const question = await Question.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { answers: req.body.answerId } },
        { new: true }
      )
        .populate({ path: "answers" })
        .exec();
      // const question = await Question.findById(req.params.id);
      // question.answers.push(req.body.answerId);
      // question.save();
      res.json(question);
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
              // { answers: { $regex: regex } }
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
      populate: "answers",
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
};
