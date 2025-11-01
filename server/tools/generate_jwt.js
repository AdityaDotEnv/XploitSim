/**
 * Tool to generate a JWT for a given username (reads DB to find user role/id), or generate an ad-hoc token.
 * Usage:
 *   node tools/generate_jwt.js --username alice
 *   node tools/generate_jwt.js --id 2 --role admin
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const argv = require('yargs').argv;

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_this';
const DB_FILE = path.resolve(process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite'));

function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '4h' });
}

if (argv.username) {
  const db = new sqlite3.Database(DB_FILE);
  db.get('SELECT id, username, role FROM users WHERE username = ?', [argv.username], (err, row) => {
    if (err || !row) {
      console.error('User not found or DB error', err && err.message);
      process.exit(1);
    }
    console.log(createToken({ id: row.id, username: row.username, role: row.role }));
    db.close();
  });
} else {
  const payload = {};
  if (argv.id) payload.id = parseInt(argv.id, 10);
  if (argv.username) payload.username = argv.username;
  if (argv.role) payload.role = argv.role;
  if (!payload.id && !payload.username) {
    console.error('Provide --username or --id');
    process.exit(1);
  }
  console.log(createToken(payload));
}
