// server/db/init_db.js
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, 'xploitsim.sqlite');
const dbDir = path.dirname(dbPath);

console.log('DB path:', dbPath);
fs.mkdirSync(dbDir, { recursive: true });

if (fs.existsSync(dbPath)) {
  console.log('Database already exists at', dbPath);
  process.exit(0);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,
      password_hash TEXT,
      role TEXT NOT NULL DEFAULT 'user'
    );
  `);

  db.run(`
    CREATE TABLE documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(owner_id) REFERENCES users(id)
    );
  `);

  db.run(`
    CREATE TABLE logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database created at', dbPath);
});

db.close();
