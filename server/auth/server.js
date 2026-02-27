import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { signToken } from "../shared/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "../data/users.sqlite";

async function getDB() {
  return open({ filename: DB_FILE, driver: sqlite3.Database });
}

// Ensure data directory exists (handled by Phase 3 planning but doing it here for safety)
// ... in a real script we'd mkdir but here we assume the structure is being built.

app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  try {
    const db = await getDB();
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, role = "user" } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  try {
    const db = await getDB();
    await db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, password, role]);
    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

const PORT = process.env.AUTH_PORT || 4100;
app.listen(PORT, () => {
  console.log(`🔑 Central Auth Service running at http://localhost:${PORT}`);
});
