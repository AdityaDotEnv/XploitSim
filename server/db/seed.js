// server/db/seed.js
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'xploitsim.sqlite');

if (!fs.existsSync(dbPath)) {
  console.error('Database file not found at', dbPath, ' — run init_db.js first.');
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

const adminPwd = process.env.ADMIN_PWD || 'admin123';
const users = [
  { username: 'admin', password: adminPwd, role: 'admin' },
  { username: 'alice', password: 'password1', role: 'user' },
  { username: 'bob', password: 'password2', role: 'user' }
];

db.serialize(() => {
  const insert = db.prepare('INSERT OR IGNORE INTO users (username, password, password_hash, role) VALUES (?, ?, ?, ?)');
  for (const u of users) {
    const hash = bcrypt.hashSync(String(u.password), 8);
    insert.run(u.username, u.password, hash, u.role, (err) => {
      if (err) console.error('Error inserting', u.username, err.message);
    });
  }
  insert.finalize();

  // Insert sample documents (if none exist)
  db.get('SELECT COUNT(*) as c FROM documents', (err, row) => {
    if (err) {
      console.error('Error checking documents count', err.message);
      return db.close();
    }
    if (row.c === 0) {
      // fetch user ids
      db.all('SELECT id, username FROM users', (e, rows) => {
        if (e) {
          console.error('Error reading users', e.message);
          return db.close();
        }
        const stmt = db.prepare('INSERT INTO documents (owner_id, title, content) VALUES (?, ?, ?)');
        for (const r of rows) {
          stmt.run(r.id, `${r.username}'s public doc`, `This is a sample document for ${r.username}.`);
          stmt.run(r.id, `${r.username}'s private doc`, `Private content for ${r.username}.`);
        }
        stmt.finalize(() => {
          db.run("INSERT INTO logs (action) VALUES ('seeded documents')", () => {
            console.log('Seeding complete.');
            db.close();
          });
        });
      });
    } else {
      console.log('Documents already present.');
      db.close();
    }
  });
});
