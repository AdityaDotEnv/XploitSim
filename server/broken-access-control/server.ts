import express, { Request, Response } from "express";
import cors from "cors";
import { signToken } from "../shared/auth.ts";
import { requireAuth, AuthenticatedRequest } from "../shared/middleware.ts";
import { db } from "./db.ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// ---- Authentication ----
app.post("/auth/login", (req: Request, res: Response): any => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username and password required" });

  db.get("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, user: any) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Use shared signing
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token });
  });
});

/**
 * Important: place the owner-listing endpoint BEFORE the generic :id route
 */
app.get("/documents/owner/:ownerId", (req: Request, res: Response) => {
  const ownerId = Number(req.params.ownerId);
  db.all("SELECT id, owner_id, title, created_at FROM documents WHERE owner_id = ?", [ownerId], (err, rows) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    res.json({ documents: rows });
  });
});

app.get("/documents/:id", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const id = Number(req.params.id);
  db.get("SELECT id, owner_id, title, content, created_at FROM documents WHERE id = ?", [id], (err, doc: any) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!doc) return res.status(404).json({ error: "document not found" });

    res.json({ document: doc });
  });
});

app.post("/documents/:id/edit", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body || {};
  db.get("SELECT owner_id, title, content FROM documents WHERE id = ?", [id], (err, row: any) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!row) return res.status(404).json({ error: "document not found" });

    db.run("UPDATE documents SET title = ?, content = ? WHERE id = ?", [title || row.title, content || row.content, id], function (this: any, uerr) {
      if (uerr) return res.status(500).json({ error: "db error", details: uerr.message });
      res.json({ success: true, affectedRows: this.changes, updatedBy: req.user });
    });
  });
});

app.get("/admin/stats", (req: Request, res: Response) => {
  db.get("SELECT COUNT(*) as users FROM users", (err, urow: any) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    db.get("SELECT COUNT(*) as docs FROM documents", (err2, drow: any) => {
      if (err2) return res.status(500).json({ error: "db error", details: err2.message });
      res.json({ stats: { users: urow.users, documents: drow.docs } });
    });
  });
});

app.post("/admin/users/:id/role", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const targetId = Number(req.params.id);
  const { role } = req.body || {};
  if (!role) return res.status(400).json({ error: "role required" });
  db.run("UPDATE users SET role = ? WHERE id = ?", [role, targetId], function (this: any, err) {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    res.json({ success: true, affectedRows: this.changes, changedBy: req.user });
  });
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "XploitSim - broken access control demo (SANDBOX)" });
});

const PORT = process.env.BAC_PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Broken Access Control sandbox running on http://localhost:${PORT}`);
});
