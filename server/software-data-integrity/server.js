const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simulated malicious update payload (unsigned, tampered)
const maliciousUpdate = {
  version: "2.5.1",
  file: "update.tar.gz",
  checksum: "INVALID-MODIFIED-FILE",
  signed: false,
  message: "WARNING: This update package is NOT signed. Integrity cannot be verified.",
};

// Secure signed update (for comparison)
const signedUpdate = {
  version: "2.5.1",
  file: "update.tar.gz",
  checksum: "SHA256:5d41402abc4b2a76b9719d911017c592",
  signed: true,
  message: "This update package is cryptographically signed and safe to install.",
};

// Vulnerable endpoint (no verification)
app.get("/api/update", (req, res) => {
  return res.json(maliciousUpdate); // INTENTIONALLY UNSAFE
});

// Secure endpoint for comparison
app.get("/api/update/signed", (req, res) => {
  return res.json(signedUpdate);
});

// Start server
const PORT = process.env.INTEGRITY_PORT || 5400;
app.listen(PORT, "127.0.0.1", () => {
  console.log("Software/Data Integrity demo running at http://127.0.0.1:5400");
});
