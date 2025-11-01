/**
 * Documents routes - intentionally vulnerable for teaching:
 * - GET /documents/:id         -> IDOR: returns document without ownership check
 * - GET /documents/owner/:ownerId -> missing authorization
 * - POST /documents/:id/edit   -> improper authorization: only checks token validity, not ownership
 */

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, '../db/xploitsim.sqlite');
const db = new sqlite3.Database(DB_FILE);
const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

// GET /documents/:id  (IDOR)
router.get('/:id', optionalAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.get('SELECT id, owner_id, title, content, created_at FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!doc) return res.status(404).json({ error: 'document not found' });

    // VULNERABILITY: no ownership check
    return res.json({ document: doc, debug: { requester: req.user || null, authError: req.authError || null } });
  });
});

// GET /documents/owner/:ownerId (missing auth)
router.get('/owner/:ownerId', (req, res) => {
  const ownerId = parseInt(req.params.ownerId, 10);
  db.all('SELECT id, owner_id, title, created_at FROM documents WHERE owner_id = ?', [ownerId], (err, docs) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ documents: docs });
  });
});

// POST /documents/:id/edit (improper authorization)
router.post('/:id/edit', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body || {};

  db.get('SELECT owner_id FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!doc) return res.status(404).json({ error: 'document not found' });

    // VULNERABILITY: only checks for valid token; doesn't require ownership or admin role
    db.run('UPDATE documents SET title = ?, content = ? WHERE id = ?', [title || 'Untitled', content || '', id], function (uerr) {
      if (uerr) return res.status(500).json({ error: 'db error', details: uerr.message });
      return res.json({ success: true, affectedRows: this.changes, updatedBy: req.user });
    });
  });
});

module.exports = router;
