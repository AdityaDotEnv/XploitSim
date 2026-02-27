import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DB_FILE = path.join(__dirname, '../data/injection.sqlite');

async function getDB(): Promise<Database> {
  return open({ filename: DB_FILE, driver: sqlite3.Database });
}

// Vulnerable endpoint: returns user(s) by username - SQL concatenation (VULNERABLE)
app.get('/vulnerable/users', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  const db = await getDB();
  try {
    // WARNING: intentionally vulnerable to SQL injection for learning/demo only
    const sql = `SELECT id, username FROM users WHERE username LIKE '%${q}%'`;
    const rows = await db.all(sql);
    res.json({ ok: true, rows, sql });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  } finally {
    await db.close();
  }
});

// Safe endpoint: parameterized (PREVENTS INJECTION)
app.get('/safe/users', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  const db = await getDB();
  try {
    // Parameterized query - prevents SQL injection
    const rows = await db.all("SELECT id, username FROM users WHERE username LIKE ?", [`%${q}%`]);
    res.json({ ok: true, rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  } finally {
    await db.close();
  }
});

// A simulated insecure logging endpoint that demonstrates untrusted data reflected back
app.post('/vulnerable/echo', async (req: Request, res: Response) => {
  const { text } = req.body || { text: '' };
  // This endpoint intentionally reflects input (could be used to show XSS on the frontend)
  res.json({ ok: true, echoed: text });
});

const PORT = process.env.INJECTION_PORT || 5100;
app.listen(PORT, () => {
  console.log(`💉 Injection backend running at http://localhost:${PORT}`);
});
