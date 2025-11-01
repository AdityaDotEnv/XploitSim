// server/routes/admin.js
// Vulnerable admin routes: missing role/authorization checks.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');
const { requireAuth } = require('../middleware/jwtAuth');

function getDb() {
  return new sqlite3.Database(DB_FILE);
}

/**
 * GET /admin/stats
 * VULNERABILITY: no auth required here (for demo) — returns counts.
 */
router.get('/stats', (req, res) => {
  const db = getDb();
  db.get('SELECT COUNT(*) as users FROM users', (err, urow) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'db error', details: err.message });
    }
    db.get('SELECT COUNT(*) as docs FROM documents', (err2, drow) => {
      db.close();
      if (err2) return res.status(500).json({ error: 'db error', details: err2.message });
      return res.json({ stats: { users: urow.users, documents: drow.docs } });
    });
  });
});

/**
 * POST /admin/users/:id/role
 * VULNERABILITY: requires authentication, but any authenticated user can change roles (no admin check).
 */
router.post('/users/:id/role', requireAuth, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { role } = req.body || {};
  if (!role) return res.status(400).json({ error: 'role required' });

  const db = getDb();
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, targetId], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ success: true, affectedRows: this.changes, changedBy: req.user });
  });
});

module.exports = router;
