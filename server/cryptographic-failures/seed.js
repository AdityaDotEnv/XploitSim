// server/cryptographic-failures/seed.js
import { db } from "./db.js";

// Seed minimal users
db.serialize(() => {
  const stmt = db.prepare("INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)");
  stmt.run("alice", "aliceplaintext");   // intentionally insecure
  stmt.run("bob", "bobplaintext");
  stmt.finalize();
  console.log("✅ Seeded users (alice, bob) with plaintext passwords.");
});
db.close();
