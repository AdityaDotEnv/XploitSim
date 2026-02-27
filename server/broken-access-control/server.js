// server/broken-access-control/server.js
import express from "express";
import cors from "cors";
import { signToken } from "../shared/auth.js";
import { requireAuth } from "../shared/middleware.js";
import { db } from "./db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });


const app = express();
app.use(cors());
app.use(express.json());

// ---- Authentication ----
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });

  db.get("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, user) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Use shared signing
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token });
  });
});

// Middleware now imported from shared


/**
 * Important: place the owner-listing endpoint BEFORE the generic :id route
 * so '/documents/owner/2' does not get captured by '/documents/:id'
 */
// List documents by owner (no RBAC needed to view this listing)
app.get("/documents/owner/:ownerId", (req, res) => {
  const ownerId = Number(req.params.ownerId);
  db.all("SELECT id, owner_id, title, created_at FROM documents WHERE owner_id = ?", [ownerId], (err, rows) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    res.json({ documents: rows });
  });
});

/**
 * GET /documents/:id
 * VULNERABILITY: no ownership check here (intentional)
 */
app.get("/documents/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  db.get("SELECT id, owner_id, title, content, created_at FROM documents WHERE id = ?", [id], (err, doc) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!doc) return res.status(404).json({ error: "document not found" });

    // << VULNERABLE: no check that req.user.id === doc.owner_id or role==='admin' >>
    res.json({ document: doc });
  });
});

/**
 * POST /documents/:id/edit
 * VULNERABILITY: requires token but does NOT verify ownership — any logged-in user can edit any document.
 */
app.post("/documents/:id/edit", requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body || {};
  db.get("SELECT owner_id, title, content FROM documents WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!row) return res.status(404).json({ error: "document not found" });

    // << VULNERABLE: missing check: should verify req.user.id === row.owner_id || req.user.role === 'admin' >>
    db.run("UPDATE documents SET title = ?, content = ? WHERE id = ?", [title || row.title, content || row.content, id], function (uerr) {
      if (uerr) return res.status(500).json({ error: "db error", details: uerr.message });
      res.json({ success: true, affectedRows: this.changes, updatedBy: req.user });
    });
  });
});

/**
 * Admin routes (intentionally vulnerable)
 */

// GET /admin/stats (no role check)
app.get("/admin/stats", (req, res) => {
  db.get("SELECT COUNT(*) as users FROM users", (err, urow) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    db.get("SELECT COUNT(*) as docs FROM documents", (err2, drow) => {
      if (err2) return res.status(500).json({ error: "db error", details: err2.message });
      res.json({ stats: { users: urow.users, documents: drow.docs } });
    });
  });
});

// POST /admin/users/:id/role  (requires token but no admin check)
app.post("/admin/users/:id/role", requireAuth, (req, res) => {
  const targetId = Number(req.params.id);
  const { role } = req.body || {};
  if (!role) return res.status(400).json({ error: "role required" });
  db.run("UPDATE users SET role = ? WHERE id = ?", [role, targetId], function (err) {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    res.json({ success: true, affectedRows: this.changes, changedBy: req.user });
  });
});

// small health or root
app.get("/", (req, res) => {
  res.json({ message: "XploitSim - broken access control demo (SANDBOX)" });
});

const PORT = process.env.BAC_PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Broken Access Control sandbox running on http://localhost:${PORT}`);
});
