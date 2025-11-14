import express from 'express';

const app = express();
app.use(express.json());

// -------------------------------------------
//  CORS FIX (WORKS 100%)
// -------------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-admin-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Fix preflight OPTIONS requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// -------------------------------------------
// CONFIG OBJECT
// -------------------------------------------
let INSECURE_CONFIG = {
  debug: true,
  featureXEnabled: true,
  adminEmail: 'admin@example.local',
  db: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres'
  }
};

// -------------------------------------------
// Vulnerable Config Endpoint
// -------------------------------------------
app.get('/vulnerable/config', (req, res) => {
  res.json({ ok: true, config: INSECURE_CONFIG });
});

// -------------------------------------------
// Safe Config Endpoint
// -------------------------------------------
app.get('/safe/config', (req, res) => {
  const safe = {
    debug: false,
    featureXEnabled: !!INSECURE_CONFIG.featureXEnabled,
  };
  res.json({ ok: true, config: safe });
});

// -------------------------------------------
// Vulnerable Feature Toggle (no auth)
// -------------------------------------------
app.post('/vulnerable/toggle-feature', (req, res) => {
  const { feature, enabled } = req.body || {};
  if (!feature) return res.status(400).json({ ok: false, error: "invalid feature" });

  INSECURE_CONFIG[feature] = !!enabled;
  res.json({ ok: true, feature, enabled: INSECURE_CONFIG[feature] });
});

// -------------------------------------------
// Safe Toggle (requires admin token)
// -------------------------------------------
app.post('/safe/toggle-feature', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== "let-me-admin")
    return res.status(401).json({ ok: false, error: "unauthorized" });

  const { feature, enabled } = req.body || {};
  INSECURE_CONFIG[feature] = !!enabled;

  res.json({ ok: true, feature, enabled: INSECURE_CONFIG[feature] });
});

// -------------------------------------------
// Vulnerable Error Leak
// -------------------------------------------
app.get('/vulnerable/error', (req, res) => {
  try {
    throw new Error("Simulated internal error — stack trace will be shown");
  } catch (err) {
    if (INSECURE_CONFIG.debug) {
      res.status(500).json({
        ok: false,
        error: err.message,
        stack: err.stack,
      });
    } else {
      res.status(500).json({ ok: false, error: "Internal Server Error" });
    }
  }
});

// -------------------------------------------
// Safe Error
// -------------------------------------------
app.get('/safe/error', (req, res) => {
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// -------------------------------------------
// Start Server
// -------------------------------------------
const PORT = 5200;
app.listen(PORT, () =>
  console.log(`Insecure Design sandbox running on http://localhost:${PORT}`)
);
