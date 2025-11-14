// server/cryptographic-failures/server.js
/**
 * Cryptographic Failures - demo server
 * WARNING: intentionally insecure. SANDBOX ONLY.
 *
 * Safety: Only runs when NODE_ENV !== 'production'.
 */

import express from "express";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

// SAFETY: refuse to run when NODE_ENV=production
if (process.env.NODE_ENV === "production") {
  console.error("Refusing to run vulnerable demo in production environment.");
  process.exit(1);
}

/**
 * Intentionally weak static key (for demo only).
 * In real world use: never hard-code keys, use a KMS, use random IVs and authenticated encryption.
 */
const STATIC_AES_KEY = Buffer.from("0123456789abcdef0123456789abcdef", "utf8"); // 32 bytes (demo)
const STATIC_IV = Buffer.from("abcdef9876543210", "utf8"); // 16 bytes (demo)
const WEAK_JWT_SECRET = "demo_weak_secret"; // intentionally weak

// ---- Utility (vulnerable) ----
// AES-256-CBC with static IV -> deterministic encryption (vulnerable)
function encryptStatic(plaintext) {
  const cipher = crypto.createCipheriv("aes-256-cbc", STATIC_AES_KEY, STATIC_IV);
  let encrypted = cipher.update(String(plaintext), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}
function decryptStatic(ciphertext) {
  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", STATIC_AES_KEY, STATIC_IV);
    let out = decipher.update(String(ciphertext), "base64", "utf8");
    out += decipher.final("utf8");
    return out;
  } catch (e) {
    return null;
  }
}

// weak hash example (MD5)
function weakHashMD5(input) {
  return crypto.createHash("md5").update(String(input)).digest("hex");
}

// ---- Routes ----

// Health
app.get("/", (req, res) => {
  res.json({ message: "Cryptographic Failures demo (SANDBOX only)" });
});

// Login using plaintext password (vulnerable)
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "username & password required" });

  db.get("SELECT * FROM users WHERE username=?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    // vulnerable: comparing plaintext passwords
    if (user.password !== password) return res.status(401).json({ error: "invalid credentials" });

    // vulnerable: JWT with weak secret and long expiry (demo)
    const token = jwt.sign({ id: user.id, username: user.username, role: "user" }, WEAK_JWT_SECRET/*weak*/, { expiresIn: "7d" });

    res.json({ token, note: "This token uses a weak secret & long expiry (vulnerable demo)" });
  });
});

// Create weak MD5 hash (demo endpoint)
app.post("/crypto/hash-md5", (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text required" });
  const md5 = weakHashMD5(text);
  res.json({ algorithm: "MD5", digest: md5, warning: "MD5 is broken - do not use for passwords" });
});

// Encrypt with static key+IV (vulnerable)
app.post("/crypto/encrypt-static", (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "text required" });
  const ciphertext = encryptStatic(text);
  res.json({ ciphertext, warning: "Static IV/key used. Ciphertext is deterministic" });
});

// Decrypt static
app.post("/crypto/decrypt-static", (req, res) => {
  const { ciphertext } = req.body || {};
  if (!ciphertext) return res.status(400).json({ error: "ciphertext required" });
  const pt = decryptStatic(ciphertext);
  res.json({ plaintext: pt });
});

// Store/Reveal secrets (encrypt & store)
app.post("/users/:id/store-secret", (req, res) => {
  const id = req.params.id;
  const { secret } = req.body || {};
  if (!secret) return res.status(400).json({ error: "secret required" });
  const c = encryptStatic(secret); // vulnerable
  db.run("UPDATE users SET secret_encrypted=? WHERE id=?", [c, id], function (err) {
    if (err) return res.status(500).json({ error: "db error", details: err.message });
    return res.json({ success: true, stored: c, note: "Stored using static key/IV (not secure)" });
  });
});

app.get("/users/:id/secret", (req, res) => {
  const id = req.params.id;
  db.get("SELECT secret_encrypted FROM users WHERE id=?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.secret_encrypted) return res.status(404).json({ error: "no secret" });
    const pt = decryptStatic(row.secret_encrypted);
    res.json({ encrypted: row.secret_encrypted, plaintext: pt });
  });
});

// Demo: show weak JWT secret and how to validate (educational only)
app.post("/crypto/verify-jwt", (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: "token required" });
  try {
    const decoded = jwt.verify(token, WEAK_JWT_SECRET);
    res.json({ valid: true, decoded, warning: "JWT verified using a weak shared secret" });
  } catch (e) {
    res.status(400).json({ valid: false, error: e.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 Cryptographic Failures demo listening on http://localhost:${PORT}`);
  console.log("⚠️ WARNING: intentionally insecure. Local sandbox only.");
});
