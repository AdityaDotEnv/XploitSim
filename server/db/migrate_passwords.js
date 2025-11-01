// server/db/migrate_passwords.js
// Adds password_hash column (if missing) and hashes any existing plaintext password values.
// Usage: node db/migrate_passwords.js

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'xploitsim.sqlite');
console.log('DB path:', dbPath);

if (!fs.existsSync(dbPath)) {
  console.error('Database file not found at', dbPath);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

function all(sql, params = []) {
  return new Promise((resolve, reject) => db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows)));
}
function run(sql, params = []) {
  return new Promise((resolve, reject) => db.run(sql, params, function (err) { if (err) reject(err); else resolve(this); }));
}

(async () => {
  try {
    const cols = await all("PRAGMA table_info('users')");
    const colNames = cols.map(c => c.name);
    console.log('Existing user columns:', colNames);

    if (!colNames.includes('password_hash')) {
      console.log('Adding password_hash column...');
      await run("ALTER TABLE users ADD COLUMN password_hash TEXT DEFAULT ''");
      console.log('password_hash column added.');
    } else {
      console.log('password_hash column already exists.');
    }

    const rows = await all('SELECT id, username, password, password_hash FROM users');
    for (const r of rows) {
      const hasPlain = r.password !== null && r.password !== undefined && String(r.password).length > 0;
      const hasHash = r.password_hash !== null && r.password_hash !== undefined && String(r.password_hash).length > 0;
      if (!hasHash && hasPlain) {
        const hash = bcrypt.hashSync(String(r.password), 8);
        await run('UPDATE users SET password_hash = ? WHERE id = ?', [hash, r.id]);
        console.log(`Hashed password for ${r.username} (id=${r.id}).`);
      } else if (!hasPlain && !hasHash) {
        console.warn(`User ${r.username} (id=${r.id}) has no password to migrate.`);
      } else {
        console.log(`Skipping ${r.username} (already hashed).`);
      }
    }

    console.log('Migration complete.');
  } catch (err) {
    console.error('Migration error:', err && err.message ? err.message : err);
  } finally {
    db.close();
  }
})();
