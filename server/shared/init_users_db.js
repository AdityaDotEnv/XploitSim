import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "data", "users.sqlite");
const dataDir = path.dirname(dbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function init() {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Initial users
  const defaultUsers = [
    { username: 'alice', password: 'Password@123', role: 'user' },
    { username: 'bob', password: 'qwerty', role: 'user' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  for (const user of defaultUsers) {
    try {
      await db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [user.username, user.password, user.role]);
      console.log(`Added user: ${user.username}`);
    } catch (err) {
      if (!err.message.includes("UNIQUE constraint failed")) {
        console.error(`Error adding user ${user.username}:`, err.message);
      }
    }
  }

  console.log("✅ Central users database initialized.");
  await db.close();
}

init().catch(console.error);
