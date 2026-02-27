import express, { Request, Response } from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { signToken } from "../shared/auth.ts";
import { db } from "./db.ts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  console.error("Refusing to run vulnerable demo in production environment.");
  process.exit(1);
}

const STATIC_AES_KEY = Buffer.from("0123456789abcdef0123456789abcdef", "utf8");
const STATIC_IV = Buffer.from("abcdef9876543210", "utf8");
const WEAK_JWT_SECRET = "demo_weak_secret";

function encryptStatic(plaintext: string | number): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", STATIC_AES_KEY, STATIC_IV);
  let encrypted = cipher.update(String(plaintext), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decryptStatic(ciphertext: string): string | null {
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", STATIC_AES_KEY, STATIC_IV);
    let out = decipher.update(String(ciphertext), "base64", "utf8");
    out += decipher.final("utf8");
    return out;
  } catch (e) {
    return null;
  }
}

function weakHashMD5(input: string | number): string {
  return crypto.createHash("md5").update(String(input)).digest("hex");
}

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Cryptographic Failures demo (SANDBOX only)" });
});

app.post("/auth/login", (req: Request, res: Response) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username & password required" });

  db.get("SELECT * FROM users WHERE username=?", [username], (err, user: any) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    if (user.password !== password) return res.status(401).json({ error: "invalid credentials" });

    const token = signToken({ id: user.id, username: user.username, role: "user" });
    res.json({ token, note: "This token is now signed with the global centralized secret for cross-module sessions." });
  });
});

app.post("/crypto/hash-md5", (req: Request, res: Response) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text required" });
  const md5 = weakHashMD5(text);
  res.json({ algorithm: "MD5", digest: md5, warning: "MD5 is broken - do not use for passwords" });
});

app.post("/crypto/encrypt-static", (req: Request, res: Response) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text required" });
  const ciphertext = encryptStatic(text);
  res.json({ ciphertext, warning: "Static IV/key used. Ciphertext is deterministic" });
});

app.post("/crypto/decrypt-static", (req: Request, res: Response) => {
  const { ciphertext } = req.body || {};
  if (!ciphertext) return res.status(400).json({ error: "ciphertext required" });
  const pt = decryptStatic(ciphertext);
  res.json({ plaintext: pt });
});

app.post("/users/:id/store-secret", (req: Request, res: Response) => {
  const id = req.params.id;
  const { secret } = req.body || {};
  if (!secret) return res.status(400).json({ error: "secret required" });
  const c = encryptStatic(secret);
  db.run("UPDATE users SET secret_encrypted=? WHERE id=?", [c, id], function (err) {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    return res.json({ success: true, stored: c, note: "Stored using static key/IV (not secure)" });
  });
});

app.get("/users/:id/secret", (req: Request, res: Response) => {
  const id = req.params.id;
  db.get("SELECT secret_encrypted FROM users WHERE id=?", [id], (err, row: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.secret_encrypted) return res.status(404).json({ error: "no secret" });
    const pt = decryptStatic(row.secret_encrypted);
    res.json({ encrypted: row.secret_encrypted, plaintext: pt });
  });
});

app.post("/crypto/verify-jwt", (req: Request, res: Response) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: "token required" });
  try {
    const decoded = jwt.verify(token, WEAK_JWT_SECRET);
    res.json({ valid: true, decoded, warning: "JWT verified using a weak shared secret" });
  } catch (e: any) {
    res.status(400).json({ valid: false, error: e.message });
  }
});

const PORT = process.env.CRYPTO_PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 Cryptographic Failures demo listening on http://localhost:${PORT}`);
});
