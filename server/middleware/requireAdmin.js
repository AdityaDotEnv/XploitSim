// server/middleware/requireAdmin.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');

module.exports = function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Missing or invalid token' });

  const db = new sqlite3.Database(DB_FILE);
  db.get('SELECT role FROM users WHERE id = ?', [req.user.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!row) return res.status(401).json({ error: 'User not found' });
    if (row.role !== 'admin') return res.status(403).json({ error: 'admin required' });
    next();
  });
};
