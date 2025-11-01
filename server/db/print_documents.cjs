// server/db/print_documents.cjs
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
db.all('SELECT id, owner_id, title, created_at FROM documents ORDER BY id', (err, rows) => {
  if (err) console.error('Error selecting documents:', err.message);
  else console.log('DOCUMENTS:', JSON.stringify(rows, null, 2));
  db.close();
});
