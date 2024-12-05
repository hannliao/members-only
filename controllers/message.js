const db = require('../db/queries');

module.exports = {
  get: (req, res) => {
    res.render('index', {
      title: 'New Message',
      main: 'partials/new-message-form',
    });
  },
  async post(req, res, next) {
    const message = {
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date(),
      username: req.user.username,
    };

    try {
      await db.createMessage(message);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
};
