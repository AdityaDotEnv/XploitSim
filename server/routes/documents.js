// server/routes/documents.js
// Vulnerable: IDOR + missing ownership checks on edit.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');
const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

// Open DB helper
function getDb() {
  return new sqlite3.Database(DB_FILE);
}

/**
 * GET /documents/:id
 * VULNERABILITY: no ownership check. Returns document to any caller (authenticated or not) for demo.
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = getDb();
  db.get('SELECT id, owner_id, title, content, created_at FROM documents WHERE id = ?', [id], (err, doc) => {
    db.close();
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!doc) return res.status(404).json({ error: 'document not found' });

    // NO ownership check — intentionally vulnerable
    return res.json({ document: doc });
  });
});

/**
 * POST /documents/:id/edit
 * VULNERABILITY: require valid token, but does NOT check that req.user.id === owner_id.
 * This demonstrates improper authorization/privilege escalation.
 */
router.post('/:id/edit', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body || {};
  const db = getDb();
  db.get('SELECT owner_id FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err) {
      db.close();
      return res.status(500).json({ error: 'db error', details: err.message });
    }
    if (!doc) {
      db.close();
      return res.status(404).json({ error: 'document not found' });
    }

    // NO ownership verification: ANY authenticated user can update any document (vulnerable)
    db.run('UPDATE documents SET title = ?, content = ? WHERE id = ?', [title || 'Untitled', content || '', id], function (uerr) {
      db.close();
      if (uerr) return res.status(500).json({ error: 'db error', details: uerr.message });
      return res.json({ success: true, affectedRows: this.changes, updatedBy: req.user });
    });
  });
});

/**
 * GET /documents/owner/:ownerId
 * Helper listing (vulnerable) — no auth required
 */
router.get('/owner/:ownerId', (req, res) => {
  const ownerId = parseInt(req.params.ownerId, 10);
  const db = getDb();
  db.all('SELECT id, owner_id, title, created_at FROM documents WHERE owner_id = ?', [ownerId], (err, docs) => {
    db.close();
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ documents: docs });
  });
});

module.exports = router;
