const db = require('../db/queries');

module.exports = {
  get: (req, res) => {
    res.render('index', { main: 'new-message-form' });
  },
  async post(req, res) {
    if (!req.user) {
      return res.redirect('log-in');
    }
    const message = {
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date().toLocaleString(),
      user_id: req.user.id,
    };

    try {
      await db.createMessage(message);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
};
