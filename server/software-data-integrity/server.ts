import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

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
app.get("/api/update", (req: Request, res: Response) => {
  return res.json(maliciousUpdate); // INTENTIONALLY UNSAFE
});

// Secure endpoint for comparison
app.get("/api/update/signed", (req: Request, res: Response) => {
  return res.json(signedUpdate);
});

app.get("/vulnerable/integrity-check", (req: Request, res: Response) => {
    res.json({
        status: "CRITICAL",
        message: "INTEGRITY FAILURE: Detected unsigned binary 'core_lib.so' in /usr/bin. Possible tampering detected.",
        timestamp: new Date().toISOString()
    });
});

// Start server
const PORT = Number(process.env.INTEGRITY_PORT) || 5400;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Software/Data Integrity demo running at http://127.0.0.1:${PORT}`);
});
