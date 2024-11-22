const pool = require('./pool');

async function createUser(user) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, $5)`,
    [
      user.firstname,
      user.lastname,
      user.username,
      user.password,
      user.membership,
    ]
  );
}

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  const user = rows[0];
  return user;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE USERNAME = $1 ',
    [username]
  );
  const user = rows[0];
  return user;
}

async function updateUser(user) {
  await pool.query(
    `
    UPDATE users
    SET firstname = $2, lastname = $3, username = $4, password = $5, membership = $6
    WHERE id = $1`,
    [
      user.id,
      user.firstname,
      user.lastname,
      user.username,
      user.password,
      user.membership,
    ]
  );
}

// delete user

async function createMessage(message) {
  await pool.query(
    `INSERT INTO messages (title, text, timestamp, user_id) VALUES ($1, $2, $3, $4)`,
    [message.title, message.text, message.timestamp, message.user_id]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query(
    'SELECT * FROM messages ORDER BY timestamp DESC;'
  );
  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

// delete message

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  createMessage,
  getMessage,
  getAllMessages,
};
