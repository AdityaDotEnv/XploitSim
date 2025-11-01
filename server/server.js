// server/server.js
// Vulnerable demo server (Broken Access Control) - CommonJS version
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// ensure DATABASE_FILE is absolute and inside this server folder's db/ by default
const configured = process.env.DATABASE_FILE || './db/xploitsim.sqlite';
const dbPath = path.resolve(__dirname, configured.replace(/^(\.\/|\/)/, ''));
process.env.DATABASE_FILE = dbPath;

console.log('🗂️ Using database file at:', dbPath);

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Safety note: requires SANDBOX=1 in .env to proceed (defensive)
if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to run in production mode.');
  process.exit(1);
}
if (String(process.env.SANDBOX) !== '1') {
  console.error('Refusing to run: SANDBOX is not enabled. Set SANDBOX=1 in .env for local sandbox.');
  process.exit(1);
}

// Ensure db dir exists
fs.mkdirSync(path.dirname(process.env.DATABASE_FILE), { recursive: true });

// If DB missing, create & seed automatically (convenience)
// The init_db.js + seed.js scripts are idempotent; call them if DB missing.
if (!fs.existsSync(process.env.DATABASE_FILE)) {
  console.log('⚠️ Database not found. Creating and seeding (sandbox-only).');
  try {
    require('./db/init_db.js');
    require('./db/seed.js');
    console.log('✅ DB created and seeded.');
  } catch (err) {
    console.error('Error creating/seeding DB:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

// mount routes
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/documents');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/documents', docRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'XploitSim - Broken Access Control vulnerable demo (sandbox)' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`XploitSim vulnerable sandbox listening at http://localhost:${PORT}`);
});
