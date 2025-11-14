// server/cryptographic-failures/init_db.js
import { db } from "./db.js";

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,     -- intentionally plaintext (vulnerable)
      secret_encrypted TEXT
    )
  `);

  console.log("✅ Database initialized.");
});
db.close();
