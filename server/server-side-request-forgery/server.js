const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ❌ INTENTIONALLY VULNERABLE SSRF ENDPOINT
app.post("/api/ssrf", async (req, res) => {
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

// Secure version for comparison
app.get("/api/ssrf/safe", (req, res) => {
  res.json({
    message: "Safe endpoint: Only whitelisted internal resources allowed.",
    whitelist: ["https://example.com/api/safe"]
  });
});

const PORT = process.env.SSRF_PORT || 5500;
app.listen(PORT, "127.0.0.1", () => {
  console.log("SSRF demo running at http://127.0.0.1:5500");
});
