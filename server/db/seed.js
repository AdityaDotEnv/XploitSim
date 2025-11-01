/**
 * seed.js
 * Populates the database with initial users and documents.
 */

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// ✅ Always resolve relative to this file, not CWD
const dbPath = path.join(__dirname, "xploitsim.sqlite");

console.log(`🗂️ Using database: ${dbPath}`);

if (!fs.existsSync(dbPath)) {
  console.error(`❌ Database file not found. Run init_db.js first.`);
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log("Seeding users...");

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "alice", password: "password1", role: "user" },
    { username: "bob", password: "password2", role: "user" },
  ];

  for (const u of users) {
    db.run(
      `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
      [u.username, u.password, u.role],
      (err) => {
        if (err) console.error(`⚠️ Error inserting ${u.username}:`, err.message);
        else console.log(`✅ Inserted ${u.username}`);
      }
    );
  }

  console.log("Seeding documents...");

  db.run(
    `INSERT INTO documents (owner_id, title, content) VALUES (1, 'Admin Secret', 'This is an admin-only document.')`
  );
  db.run(
    `INSERT INTO documents (owner_id, title, content) VALUES (2, 'Alice Notes', 'Alice personal notes.')`
  );
  db.run(
    `INSERT INTO documents (owner_id, title, content) VALUES (3, 'Bob Draft', 'Bob draft document.')`
  );

  db.run(`INSERT INTO logs (message) VALUES ('Database seeded successfully.')`);

  console.log("✅ Seeding completed.");
});

db.close(() => {
  console.log("✅ Database connection closed.");
});
