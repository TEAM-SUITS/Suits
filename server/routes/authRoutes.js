const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/github', passport.authenticate('github'));
  app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: 'http://localhost:3000/login',
      successRedirect: 'http://localhost:3000/login',
    }),
    function (req, res) {
      res.sendStatus(200);
    }
  );

  app.get('/auth/user', (req, res) => {
    if (req.user) {
      res.send({ user: req.user });
    } else {
      res.send({ user: null });
    }
  });

  app.get('/auth/logout', (req, res) => {
    if (req.user) {
      req.logout();
      // res.redirect("http://localhost:3000/login");
      res.redirect('/');
    } else {
      res.send({
        message: '로그아웃할 유저 정보를 찾을 수 없습니다',
      });
    }
  });
};
