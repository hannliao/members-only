const db = require('../db/queries');

function createMessageGet(req, res) {
  res.render('index', {
    title: 'New Message',
    main: 'partials/new-message-form',
  });
}

async function createMessagePost(req, res, next) {
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
}

async function deleteMessagePost(req, res, next) {
  const messageId = req.params.id;
  try {
    await db.deleteMessage(messageId);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMessageGet,
  createMessagePost,
  deleteMessagePost,
};
