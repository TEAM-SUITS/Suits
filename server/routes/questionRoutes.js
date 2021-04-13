const mongoose = require('mongoose');
const Question = require('../model/Question');

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

      res.json(randomQuestion);
      console.log(randomNumber);
    } catch(err) {
      res.json('Error :' + err);
    }
  });
};
