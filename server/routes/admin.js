/**
 * Admin routes - intentionally vulnerable:
 * - GET /admin/stats             -> missing role check
 * - POST /admin/users/:id/role   -> allows role change with insufficient checks
 */

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');
const db = new sqlite3.Database(DB_FILE);
const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

// GET /admin/stats (no role check)
router.get('/stats', optionalAuth, (req, res) => {
  db.serialize(() => {
    db.get('SELECT COUNT(*) as users FROM users', (err, urow) => {
      if (err) return res.status(500).json({ error: 'db error', details: err.message });
      db.get('SELECT COUNT(*) as docs FROM documents', (err2, drow) => {
        if (err2) return res.status(500).json({ error: 'db error', details: err2.message });
        return res.json({ stats: { users: urow.users, documents: drow.docs }, requester: req.user || null });
      });
    });
  });
});

// POST /admin/users/:id/role (vulnerable)
router.post('/users/:id/role', requireAuth, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { role } = req.body || {};
  if (!role) return res.status(400).json({ error: 'role required' });

  // VULNERABILITY: trusts any authenticated user to change roles
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, targetId], function (err) {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ success: true, affectedRows: this.changes, changedBy: req.user });
  });
});

module.exports = router;
