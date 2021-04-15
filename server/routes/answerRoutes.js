const mongoose = require('mongoose');
const Answer = require('../model/Answer');
const requireLogin = require('../middlewares/requireLogin');

/* ------------------------------ export routes ----------------------------- */
module.exports = (app) => {
  // 전체 answers 조회 API
  app.get('/api/answers', async (req, res) => {
    try {
      const answers = await Answer.find();

      res.json(answers);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};
