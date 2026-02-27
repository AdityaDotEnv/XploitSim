import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ❌ INTENTIONALLY VULNERABLE SSRF ENDPOINT
app.post("/api/ssrf", async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    // ⚠️ Vulnerable: Blindly fetching attacker-supplied URL
    const fetched = await axios.get(url);

    return res.json({
      requestedUrl: url,
      status: fetched.status,
      data: fetched.data,
      vulnerable: true,
      message: "Fetched external resource WITHOUT validation — SSRF vulnerability."
    });

  } catch (err) {
    return res.status(500).json({
      requestedUrl: url,
      error: String(err),
      vulnerable: true
    });
  }
});

app.post("/vulnerable/fetch-url", async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const response = await axios.get(url, { timeout: 3000 });
        res.json({
            url,
            status: response.status,
            content: typeof response.data === 'string' ? response.data.substring(0, 500) : response.data,
            message: "Data fetched successfully from target URL."
        });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to fetch URL", details: error.message });
    }
});

app.get("/vulnerable/internal", (req: Request, res: Response) => {
    res.json({
        secret_data: "ADMIN_ONLY_CONFIDENTIAL_KEY_12345",
        environment: "PRODUCTION_INTERNAL",
        access: "AUTHORIZED_INTERNAL"
    });
});

// Secure version for comparison
app.get("/api/ssrf/safe", (req: Request, res: Response) => {
  res.json({
    message: "Safe endpoint: Only whitelisted internal resources allowed.",
    whitelist: ["https://example.com/api/safe"]
  });
});

const PORT = Number(process.env.SSRF_PORT) || 5500;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`SSRF demo running at http://127.0.0.1:${PORT}`);
});
