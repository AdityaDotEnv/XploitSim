/**
 * add_created_at_to_documents.js (fixed version)
 *
 * Adds a `created_at` TIMESTAMP column to the `documents` table if missing,
 * and populates existing rows with the current timestamp.
 *
 * Usage: node db/add_created_at_to_documents.js
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, 'xploitsim.sqlite');
console.log('DB path:', dbPath);

if (!fs.existsSync(dbPath)) {
  console.error('❌ Database file not found at', dbPath);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

(async () => {
  try {
    const cols = await all("PRAGMA table_info('documents')");
    const colNames = cols.map(c => c.name);
    console.log('Existing document columns:', colNames);

    if (!colNames.includes('created_at')) {
      console.log('Adding created_at column (no default)...');
      await run("ALTER TABLE documents ADD COLUMN created_at TEXT");
      console.log('✅ created_at column added.');

      console.log('Populating created_at for existing documents...');
      await run("UPDATE documents SET created_at = datetime('now') WHERE created_at IS NULL OR created_at = ''");
      console.log('✅ created_at populated for existing rows.');
    } else {
      console.log('created_at column already present — nothing to do.');
    }

    const rows = await all('SELECT id, owner_id, title, created_at FROM documents ORDER BY id LIMIT 10');
    console.log('Sample documents:', JSON.stringify(rows, null, 2));
    console.log('✅ Migration finished successfully.');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    db.close();
  }
})();
