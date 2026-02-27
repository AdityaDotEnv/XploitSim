import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

/**
 * Returns a promise-based database connection.
 */
export async function getDbConnection(dbName) {
  return open({
    filename: path.join(DATA_DIR, `${dbName}.sqlite`),
    driver: sqlite3.Database
  });
}

/**
 * Returns a standard sqlite3 Database object (for callback-style code).
 */
export function getSqlite3Db(dbName) {
  const dbPath = path.join(DATA_DIR, `${dbName}.sqlite`);
  return new sqlite3.Database(dbPath);
}

export const DB_PATHS = {
  USERS: 'users',
  BROKEN_ACCESS: 'broken_access',
  CRYPTO: 'crypto',
  INJECTION: 'injection',
  INSECURE_DESIGN: 'insecure_design',
  LOGGING: 'logging',
  MISCONFIGURATION: 'misconfiguration',
  INTEGRITY: 'integrity'
};
