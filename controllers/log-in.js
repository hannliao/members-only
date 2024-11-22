const { validationResult } = require('express-validator');
const passport = require('passport');

exports.loginUserGet = (req, res) => {
  res.render('log-in-form', { title: 'Log In', errors: [] });
};

exports.loginUserPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('log-in-form', {
      title: 'Log In',
      errors: errors.array(),
      username: req.body.username,
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).render('log-in-form', {
        title: 'Log In',
        errors: [{ msg: info.message }],
        username: req.body.username,
      });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};
