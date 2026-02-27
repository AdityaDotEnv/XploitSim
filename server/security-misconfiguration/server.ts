import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
const PORT = process.env.MISCONFIG_PORT || 5300;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

function setSafeHeaders(req: Request, res: Response, next: NextFunction) {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
  res.set('Referrer-Policy', 'no-referrer');
  next();
}

function vulnerableLog(req: Request, res: Response, next: NextFunction) {
  console.log(`[VULNERABLE] ${req.method} ${req.path} — from ${req.ip}`);
  next();
}

const simulatedFiles = ['index.html', 'README.md', 'test.txt', 'secret-config.json'];

app.get('/vulnerable/defaults', vulnerableLog, (req: Request, res: Response) => {
  res.json({
    note: 'This endpoint intentionally returns insecure default credentials for teaching.',
    default_admin: {
      username: 'admin',
      password: 'admin123'
    },
    sample_config: {
      debug: true,
      allow_registration: true
    }
  });
});

app.get('/vulnerable/headers', vulnerableLog, (req: Request, res: Response) => {
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

app.get('/vulnerable/files', vulnerableLog, (req: Request, res: Response) => {
  res.json({
    note: 'Simulated directory listing. Exposing file names can leak sensitive information.',
    files: simulatedFiles
  });
});

app.post('/vulnerable/delete-file', vulnerableLog, (req: Request, res: Response) => {
  const { filename } = req.body || {};
  if (!filename) {
    return res.status(400).json({ error: 'Provide { "filename": "..." } in JSON body.' });
  }
  const idx = simulatedFiles.indexOf(filename);
  if (idx === -1) {
    return res.json({ message: `File '${filename}' not found (simulated).` });
  }
  simulatedFiles.splice(idx, 1);
  console.log(`[VULNERABLE] deleted (simulated) file: ${filename}`);
  res.json({ message: `File '${filename}' deleted (simulated) — no auth required.` });
});

app.get('/vulnerable/error', vulnerableLog, (req: Request, res: Response) => {
  try {
    throw new Error('Simulated server error for teaching purposes');
  } catch (err: any) {
    if (req.query.debug === 'true') {
      return res.status(500).send({ error: err.stack });
    }
    return res.status(500).send({
      error: 'Internal Server Error (use ?debug=true for stack on vulnerable endpoint)'
    });
  }
});

app.get('/vulnerable/cors', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.json({ note: 'CORS: Access-Control-Allow-Origin: * (intentionally permissive for demo)' });
});

app.get('/safe/defaults', setSafeHeaders, (req: Request, res: Response) => {
  res.json({
    note: 'Safe defaults: no passwords or secrets returned.',
    default_admin: {
      username: 'admin'
    },
    sample_config: {
      debug: false,
      allow_registration: true
    }
  });
});

app.get('/safe/headers', setSafeHeaders, (req: Request, res: Response) => {
  res.json({ note: 'Safe headers set on this response. Check response headers.' });
});

app.get('/safe/files', setSafeHeaders, (req: Request, res: Response) => {
  res.json({
    note: 'Directory access is forbidden. Returning sanitized public listing only.',
    files: simulatedFiles.filter(f => !f.toLowerCase().includes('secret'))
  });
});

app.post('/safe/delete-file', setSafeHeaders, (req: Request, res: Response) => {
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

app.get('/safe/error', setSafeHeaders, (req: Request, res: Response) => {
  console.log('[SAFE] error endpoint hit — returning generic message');
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/safe/cors', setSafeHeaders, cors({ origin: 'http://localhost:5173' }), (req: Request, res: Response) => {
  res.json({ note: 'CORS restricted to http://localhost:5173' });
});

app.get('/', (req: Request, res: Response) => res.json({ name: 'security-misconfiguration sandbox', port: PORT }));

app.listen(PORT, () => {
  console.log(`Security Misconfiguration sandbox listening at http://localhost:${PORT}`);
});
