// server/security-misconfiguration/server.js
// ESM-style Node + Express sandbox server for Security Misconfiguration
// Port: 5300
//
// IMPORTANT: This sandbox intentionally includes insecure endpoints under /vulnerable/*.
// Run locally only. Do NOT deploy publicly.

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5300;

// Basic middleware
// Allow the frontend origin by default (safe behavior for most endpoints).
// Vulnerable endpoints will demonstrate permissive CORS or no headers as needed.
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// -------------------- Educational middleware --------------------

// Safe headers middleware: used on /safe/* endpoints to demonstrate correct headers
function setSafeHeaders(req, res, next) {
  // Recommended security headers for demonstration
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
  res.set('Referrer-Policy', 'no-referrer');
  next();
}

// Vulnerable middleware: intentionally logs hits and avoids setting protective headers
function vulnerableLog(req, res, next) {
  // Educational console logging to help students see server-side activity
  console.log(`[VULNERABLE] ${req.method} ${req.path} — from ${req.ip}`);
  next();
}

// Simulated filesystem for directory listing/delete demo
const simulatedFiles = ['index.html', 'README.md', 'test.txt', 'secret-config.json'];

// -------------------- Vulnerable endpoints (demonstrations) --------------------

// a) Exposed default credentials / insecure default config
app.get('/vulnerable/defaults', vulnerableLog, (req, res) => {
  // EDU: returning credentials is insecure — shown here on purpose for demos
  res.json({
    note: 'This endpoint intentionally returns insecure default credentials for teaching.',
    default_admin: {
      username: 'admin',
      password: 'admin123' // <- insecure default password
    },
    sample_config: {
      debug: true,
      allow_registration: true
    }
  });
});

// b) Missing security headers — demonstrate omission
app.get('/vulnerable/headers', vulnerableLog, (req, res) => {
  // Deliberately avoid sending security headers
  res.json({
    note: 'This response is intentionally missing common security headers to demonstrate the issue.',
    missing: [
      'X-Content-Type-Options',
      'X-Frame-Options',
      'Strict-Transport-Security',
      'Content-Security-Policy',
      'Referrer-Policy'
    ]
  });
});

// c) Directory listing simulation
app.get('/vulnerable/files', vulnerableLog, (req, res) => {
  res.json({
    note: 'Simulated directory listing. Exposing file names can leak sensitive information.',
    files: simulatedFiles
  });
});

// d) Unsafe HTTP verb / delete file (no auth)
app.post('/vulnerable/delete-file', vulnerableLog, (req, res) => {
  const { filename } = req.body || {};
  if (!filename) {
    return res.status(400).json({ error: 'Provide { "filename": "..." } in JSON body.' });
  }
  const idx = simulatedFiles.indexOf(filename);
  if (idx === -1) {
    return res.json({ message: `File '${filename}' not found (simulated).` });
  }
  simulatedFiles.splice(idx, 1); // mutate for demonstration
  console.log(`[VULNERABLE] deleted (simulated) file: ${filename}`);
  res.json({ message: `File '${filename}' deleted (simulated) — no auth required.` });
});

// e) Verbose server error / debug mode
app.get('/vulnerable/error', vulnerableLog, (req, res) => {
  try {
    throw new Error('Simulated server error for teaching purposes');
  } catch (err) {
    if (req.query.debug === 'true') {
      // VERY INSECURE: returning stack traces leaks implementation details
      return res.status(500).send({ error: err.stack });
    }
    return res.status(500).send({
      error: 'Internal Server Error (use ?debug=true for stack on vulnerable endpoint)'
    });
  }
});

// f) Overly permissive CORS
app.get('/vulnerable/cors', (req, res) => {
  // Intentionally allow any origin — demonstrably bad in many contexts
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.json({ note: 'CORS: Access-Control-Allow-Origin: * (intentionally permissive for demo)' });
});

// -------------------- Safe endpoints (recommended behaviors) --------------------

// a) Safe defaults: don't return passwords
app.get('/safe/defaults', setSafeHeaders, (req, res) => {
  res.json({
    note: 'Safe defaults: no passwords or secrets returned.',
    default_admin: {
      username: 'admin'
      // password intentionally omitted
    },
    sample_config: {
      debug: false,
      allow_registration: true
    }
  });
});

// b) Safe headers: set appropriate security headers
app.get('/safe/headers', setSafeHeaders, (req, res) => {
  res.json({ note: 'Safe headers set on this response. Check response headers.' });
});

// c) Safe files: return sanitized listing or forbidden
app.get('/safe/files', setSafeHeaders, (req, res) => {
  res.json({
    note: 'Directory access is forbidden. Returning sanitized public listing only.',
    files: simulatedFiles.filter(f => !f.toLowerCase().includes('secret'))
  });
});

// d) Safe delete: require X-Admin-Token header
app.post('/safe/delete-file', setSafeHeaders, (req, res) => {
  const token = req.header('x-admin-token');
  const { filename } = req.body || {};
  if (token !== 'let-me-admin') {
    return res.status(403).json({ error: 'Forbidden: missing or invalid admin token in x-admin-token header.' });
  }
  if (!filename) return res.status(400).json({ error: 'Provide { "filename": "..." } in JSON body.' });
  const idx = simulatedFiles.indexOf(filename);
  if (idx === -1) return res.json({ message: `File '${filename}' not found (simulated).` });
  simulatedFiles.splice(idx, 1);
  console.log(`[SAFE] deleted (simulated) file: ${filename} by token ${token}`);
  res.json({ message: `File '${filename}' deleted (simulated) — authenticated.` });
});

// e) Safe error: generic message only
app.get('/safe/error', setSafeHeaders, (req, res) => {
  console.log('[SAFE] error endpoint hit — returning generic message');
  res.status(500).json({ error: 'Internal Server Error' });
});

// f) Safe CORS: strict allow only frontend origin
app.get('/safe/cors', setSafeHeaders, cors({ origin: 'http://localhost:5173' }), (req, res) => {
  res.json({ note: 'CORS restricted to http://localhost:5173' });
});

// -------------------- Root / health --------------------
app.get('/', (req, res) => res.json({ name: 'security-misconfiguration sandbox', port: PORT }));

// -------------------- Start --------------------
app.listen(PORT, () => {
  console.log(`Security Misconfiguration sandbox listening at http://localhost:${PORT}`);
  console.log('** WARNING: vulnerable endpoints are intentionally insecure — run locally only **');
});

// Educational note: Do NOT deploy this server publicly. The endpoints under /vulnerable/*
// intentionally exhibit poor security practices to help students learn how to identify and fix them.
