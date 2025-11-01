// server/db/print_users.cjs
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'xploitsim.sqlite');
console.log('DB path:', dbPath);
if (!fs.existsSync(dbPath)) {
  console.error('DB file not found');
  process.exit(1);
}
const db = new sqlite3.Database(dbPath);
db.all('PRAGMA table_info(users)', (err, cols) => {
  if (err) { console.error('schema err', err.message); db.close(); return; }
  const colNames = cols.map(c => c.name);
  const selectCols = ['id','username','role'].filter(c => colNames.includes(c));
  if (colNames.includes('password')) selectCols.push('password');
  if (colNames.includes('password_hash')) selectCols.push('password_hash');
  db.all(`SELECT ${selectCols.join(', ')} FROM users ORDER BY id`, (e, rows) => {
    if (e) console.error('Error selecting users:', e.message);
    else console.log('USERS:', JSON.stringify(rows, null, 2));
    db.close();
  });
});
