const db = require('../db/queries');
const { validationResult } = require('express-validator');
const signupValidator = require('../validators/sign-up');
const bcrypt = require('bcryptjs');

exports.createUserGet = (req, res) => {
  res.render('sign-up-form', { title: 'Sign Up', errors: [] });
};

exports.createUserPost = [
  signupValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up-form', {
        title: 'Sign Up',
        errors: errors.array(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        membership: 'basic',
      };
      await db.createUser(user);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
];
