require('dotenv').config();
const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    membership VARCHAR(255),
    admin BOOLEAN DEFAULT false
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    text TEXT,
    timestamp TIMESTAMP,
    username VARCHAR(255)
  );
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT current_database()');
    console.log('connected to database: ', res.rows[0].current_database);
  } catch (err) {
    console.error('error connecting to the database: ', err);
  }

  try {
    await client.query(SQL);
    console.log('table created!');
  } catch (err) {
    console.error('error creating table: ', err);
  }

  await client.end();
  console.log('done');
}

main();
