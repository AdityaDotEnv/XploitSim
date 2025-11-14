import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


async function seed() {
const db = await open({ filename: './injection.sqlite', driver: sqlite3.Database });
await db.exec(`
DROP TABLE IF EXISTS users;
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT NOT NULL,
password TEXT NOT NULL
);
`);
await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['alice', 'alice123']);
await db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['bob', 'bob123']);
console.log('Seeded injection.sqlite with users table.');
await db.close();
}


seed().catch(err => console.error(err));