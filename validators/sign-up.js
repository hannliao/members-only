const { body } = require('express-validator');
const db = require('../db/queries');

const requiredErr = 'is required';
const lengthErr = 'must have at least 8 letters';

module.exports = [
  body('firstname').trim().notEmpty().withMessage(`First name ${requiredErr}`),
  body('lastname').trim().notEmpty().withMessage(`Last name ${requiredErr}`),
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username ${requiredErr}`)
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error('Username already taken');
      }
      return true;
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .isLength({ min: 8 })
    .withMessage(`Password ${lengthErr}`),
  body('confirmPwd').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
