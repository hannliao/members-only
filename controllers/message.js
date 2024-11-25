const db = require('../db/queries');

module.exports = {
  get: (req, res) => {
    res.render('index', {
      title: 'New Message',
      main: 'partials/new-message-form',
    });
  },
  async post(req, res) {
    if (!req.user) {
      return res.redirect('log-in');
    }
    const user = await db.getUserById(req.user.id);

    const message = {
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date(),
      username: user.username,
    };

    try {
      await db.createMessage(message);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
};
