import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(cors());


const DB_FILE = './injection.sqlite';


async function getDB() {
return open({ filename: DB_FILE, driver: sqlite3.Database });
}


// Vulnerable endpoint: returns user(s) by username - SQL concatenation (VULNERABLE)
app.get('/vulnerable/users', async (req, res) => {
const q = req.query.q || '';
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
app.get('/safe/users', async (req, res) => {
const q = req.query.q || '';
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
app.post('/vulnerable/echo', async (req, res) => {
const { text } = req.body || { text: '' };
// This endpoint intentionally reflects input (could be used to show XSS on the frontend)
res.json({ ok: true, echoed: text });
});


const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Injection sandbox listening on http://localhost:${PORT}`));