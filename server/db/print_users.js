// Print users (id, username, role, password_hash)
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(process.env.DATABASE_FILE || path.resolve(__dirname, 'xploitsim.sqlite'));
console.log('DB path:', dbPath);
if (!fs.existsSync(dbPath)) {
  console.error('DB file not found');
  process.exit(1);
}
const db = new sqlite3.Database(dbPath);
db.all('SELECT id, username, role, password_hash FROM users ORDER BY id', (err, rows) => {
  if (err) console.error('Error selecting users:', err.message);
  else console.log('USERS:', JSON.stringify(rows, null, 2));
  db.close();
});
