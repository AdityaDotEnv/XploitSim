// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');
const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_this';

// helper to open DB per-request (lightweight)
function getDb() {
  return new sqlite3.Database(DB_FILE);
}

// POST /auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const db = getDb();
  db.get('SELECT id, username, password_hash, role FROM users WHERE username = ?', [username], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!row) return res.status(401).json({ error: 'invalid credentials' });

    // Compare hashed password if present, otherwise compare plaintext (sandbox-only)
    if (row.password_hash && row.password_hash.length > 0) {
      const ok = bcrypt.compareSync(password, row.password_hash);
      if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    } else {
      // fallback to plaintext (unsafe; sandbox only)
      // note: original seed may have 'password' column; we handle gracefully by querying it
      const db2 = getDb();
      db2.get('SELECT password FROM users WHERE id = ?', [row.id], (e2, r2) => {
        db2.close();
        if (e2) return res.status(500).json({ error: 'db error', details: e2.message });
        if (!r2 || String(r2.password) !== String(password)) return res.status(401).json({ error: 'invalid credentials' });
        const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET, { expiresIn: '2h' });
        return res.json({ token });
      });
      return;
    }

    const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  });
});

// GET /auth/me
const { optionalAuth } = require('../middleware/jwtAuth');
router.get('/me', optionalAuth, (req, res) => {
  if (!req.user) return res.json({ message: 'Not authenticated' });
  res.json({ user: req.user });
});

module.exports = router;
