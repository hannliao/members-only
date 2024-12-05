const pool = require('./pool');

async function createUser(user) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, username, password, membership, admin) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      user.firstname,
      user.lastname,
      user.username,
      user.password,
      user.membership,
      user.admin,
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
    SET firstname = $2, lastname = $3, username = $4, admin = $5
    WHERE id = $1`,
    [user.id, user.firstname, user.lastname, user.username, user.admin]
  );
}

async function updatePassword(user) {
  await pool.query(
    `
    UPDATE users
    SET password = $2
    WHERE id = $1`,
    [user.id, user.password]
  );
}

async function updateMembership(id) {
  await pool.query(
    `
    UPDATE users
    SET membership = 'elite'
    WHERE id = $1`,
    [id]
  );
}

async function createMessage(message) {
  await pool.query(
    `INSERT INTO messages (title, text, timestamp, username) VALUES ($1, $2, $3, $4)`,
    [message.title, message.text, message.timestamp, message.username]
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

async function deleteMessage(id) {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  updatePassword,
  updateMembership,
  createMessage,
  getMessage,
  getAllMessages,
  deleteMessage,
};
