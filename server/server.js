/**
 * XploitSim - Broken Access Control (server.js)
 * - Resolves a stable absolute DB path and sets process.env.DATABASE_FILE
 * - Auto-creates and seeds DB if missing (sandbox-only)
 * - Loads routes after DB path is fixed
 *
 * WARNING: Intentionally vulnerable for teaching. SANDBOX gating prevents accidental production use.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();

// Safety check (will exit if not sandbox)
const sandboxCheck = require('./middleware/sandboxCheck');
sandboxCheck(); // throws/exits when unsafe

// Normalize and set DATABASE_FILE to absolute path
const configured = process.env.DATABASE_FILE || './server/db/xploitsim.sqlite';
const projectRoot = path.resolve(__dirname, '..');
const serverDir = __dirname;

// If configured points inside a "server/" path, resolve relative to project root to avoid server/server duplication
const cleaned = configured.replace(/^[.\\/]+/, '');
let dbPath;
const serverDirName = path.basename(serverDir);
if (cleaned.startsWith(`${serverDirName}/`) || cleaned.startsWith(`${serverDirName}\\`) || cleaned === serverDirName) {
  dbPath = path.resolve(projectRoot, cleaned);
} else {
  dbPath = path.resolve(serverDir, configured);
}
process.env.DATABASE_FILE = dbPath;

console.log('🗂️ Using database file at:', dbPath);

// Auto-create and seed DB if missing (sandbox-only)
if (!fs.existsSync(dbPath)) {
  console.warn('⚠️ Database not found. Creating and seeding (sandbox-only).');

  // ensure dir exists
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  try {
    execSync('node db/init_db.js', { cwd: serverDir, stdio: 'inherit' });
    execSync('node db/seed.js', { cwd: serverDir, stdio: 'inherit' });
    execSync('node db/seed_documents.js', { cwd: serverDir, stdio: 'inherit' });
    console.log('✅ Database created & seeded.');
  } catch (err) {
    console.error('❌ Error creating/seeding DB:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

// Quick DB open verification
try {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('❌ Failed to open database:', err.message);
      process.exit(1);
    } else {
      console.log('✅ Database connection verified.');
    }
  });
  db.close();
} catch (err) {
  console.error('❌ Unexpected DB open error:', err && err.message ? err.message : err);
  process.exit(1);
}

// Now safe to load route modules
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/documents');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/documents', docRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'XploitSim - Broken Access Control sandbox (development only).' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`XploitSim sandbox server listening at http://localhost:${PORT}`);
});
