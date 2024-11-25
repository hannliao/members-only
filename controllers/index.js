const db = require('../db/queries');
const { formatTimestamp } = require('../helpers/helpers');

module.exports = {
  async get(req, res) {
    if (!req.user) {
      return res.redirect('/log-in');
    }
    const messages = await db.getAllMessages();
    res.render('index', {
      title: 'Home',
      main: 'partials/messages',
      user: req.user,
      formatTimestamp,
      messages,
    });
  },
};
