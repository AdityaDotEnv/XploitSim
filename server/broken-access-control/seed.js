import { db } from "./db.js";

db.serialize(() => {
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "alice", password: "password1", role: "user" },
    { username: "bob", password: "password2", role: "user" },
  ];

  users.forEach(u => {
    db.run(
      `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
      [u.username, u.password, u.role]
    );
  });

  const docs = [
    { owner_id: 2, title: "Alice’s Private Notes", content: "Alice’s secret data" },
    { owner_id: 3, title: "Bob’s Report", content: "Bob’s confidential report" }
  ];

  docs.forEach(d => {
    db.run(
      `INSERT OR IGNORE INTO documents (owner_id, title, content) VALUES (?, ?, ?)`,
      [d.owner_id, d.title, d.content]
    );
  });

  console.log("✅ Database seeded.");
});
db.close();
