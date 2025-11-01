/**
 * init_db.js
 * Initializes the SQLite database for XploitSim sandbox
 * Creates tables: users, documents, logs
 */

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// ✅ Always resolve path relative to *this file’s directory*, not CWD
const dbDir = __dirname;
const dbPath = path.join(dbDir, "xploitsim.sqlite");

console.log(`🗂️ Database path: ${dbPath}`);

// Ensure db directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

if (fs.existsSync(dbPath)) {
  console.log(`Database already exists at ${dbPath}`);
  process.exit(0);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log("Creating tables...");

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    )
  `);

  db.run(`
    CREATE TABLE documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tables created successfully.");
});

db.close(() => {
  console.log(`✅ Database created at ${dbPath}`);
});
