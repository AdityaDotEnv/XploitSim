// server/cryptographic-failures/db.js
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFolder = path.join(__dirname, "db");
if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder);
export const DB_PATH = path.join(dbFolder, "crypto_demo.sqlite");

sqlite3.verbose();
export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ Connected to DB:", DB_PATH);
  }
});
