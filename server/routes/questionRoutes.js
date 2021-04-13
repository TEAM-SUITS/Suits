const mongoose = require('mongoose');
const Question = require('../model/Question');
const requireLogin = require("../middlewares/requireLogin");

/* ------------------------------ export routes ----------------------------- */
module.exports = (app) => {
  // 전체 questions 조회 API
  app.get('/api/questions', async (req, res) => {
    try {
      // find 메서드는 조건에 맞는 document들의 목록을 가져옴.
      const questions = await Question.find();

      res.json(questions);
    } catch(err) {
      res.json('Error :' + err);
    }
  });

  // 랜덤 questions 뽑기 API
  app.get('/api/questions/random', async (req, res) => {
    try {
      const count = await Question.countDocuments();
      const randomNumber = Math.ceil(Math.random() * (count-1));
      const randomQuestion = await Question.findOne().skip(randomNumber);

      // 또는
      // const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);

      res.json(randomQuestion);
    } catch(err) {
      res.json('Error :' + err);
    }
  });

  // Trending Question API - answers.length 값 top3인 question 가져오기
  app.get('/api/questions/trend', async (req, res) => {
    try {
      const trendingQuestions = await Question.aggregate([
        {
          "$project": {
            "answers": 1,
            "hashTag": 1,
            "_id": 1,
            "content": 1,
            "postedOn": 1,
            "length": { "$size": "$answers" }
            }
        },
        { "$sort": { "length": -1 } }, { "$limit": 3 }
      ]);

      res.json(trendingQuestions);
    } catch(err) {
      res.json('Error :' + err);
    }
  });

  // 전달 받은 아이디 값을 가진 question 조회
  app.get('/api/questions/:id', async (req, res) => {
    try {
      const questionId = mongoose.Types.ObjectId(req.params.id);
      const question = await Question.findById(questionId);

      res.json(question);
    } catch(err) {
      res.json('Error :' + err);
    }
  });

  // 💥 answers field에 전달 받은 아이디 추가하기
  app.patch('/api/questions/:id', async (req, res) => {
    try {
      const questionId = mongoose.Types.ObjectId(req.params.id);
      const question = await Question.findByIdAndUpdate(questionId, {
        $push: { answers: req.body.answerId }
      }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.json(question);
        }
      }).exec();
    } catch(err) {
      res.json('Error :' + err);
    }
  });
};
