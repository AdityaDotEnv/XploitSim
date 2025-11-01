/**
 * Create documents table (if missing) and insert sample documents for each user.
 * Run: node db/seed_documents.js
 */

require('dotenv').config();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbPath = path.resolve(process.env.DATABASE_FILE || path.resolve(__dirname, 'xploitsim.sqlite'));
if (!fs.existsSync(dbPath)) {
  console.error('Database not found at', dbPath);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => db.run(sql, params, function(err) {
    if (err) return reject(err);
    resolve(this);
  }));
}
function all(sql, params = []) {
  return new Promise((resolve, reject) => db.all(sql, params, (err, rows) => {
    if (err) return reject(err);
    resolve(rows);
  }));
}

(async () => {
  try {
    await run(`CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(owner_id) REFERENCES users(id)
    );`);

    const docs = await all('SELECT id FROM documents LIMIT 1');
    if (docs.length > 0) {
      console.log('Documents already present.');
    } else {
      const users = await all('SELECT id, username FROM users');
      if (!users || users.length === 0) {
        console.error('No users found to attach documents to. Run seed.js first.');
        db.close();
        process.exit(1);
      }
      for (const u of users) {
        await run('INSERT INTO documents (owner_id, title, content) VALUES (?, ?, ?)', [u.id, `${u.username}'s public doc`, `Public doc for ${u.username}`]);
        await run('INSERT INTO documents (owner_id, title, content) VALUES (?, ?, ?)', [u.id, `${u.username}'s private doc`, `Private doc for ${u.username}`]);
        console.log(`Inserted docs for ${u.username}`);
      }
      console.log('Document seeding complete.');
    }
  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    db.close();
  }
})();
