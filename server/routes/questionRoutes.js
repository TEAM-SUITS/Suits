const mongoose = require('mongoose');
const Question = require('../model/Question');

/* ------------------------------ export routes ----------------------------- */
module.exports = (app) => {
  app.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.find();
  
      res.json(questions);
    } catch(err) {
      res.json('Error :' + err);
    }
  });
};
