import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Demo API endpoint
app.get('/api/data', (req: Request, res: Response) => {
  res.json({
    message: "This server uses intentionally outdated components for the OWASP Vulnerable & Outdated Components demo."
  });
});

app.get("/vulnerable/outdated-api", (req: Request, res: Response) => {
    res.json({
        service: "Legacy Payment Processor",
        version: "1.0.4-patch2",
        last_update: "2018-05-12",
        status: "DEPRECATED",
        vulnerabilities: [
            { id: "CVE-2018-11776", severity: "CRITICAL", description: "RCE in Apache Struts" },
            { id: "CVE-2021-44228", severity: "CRITICAL", description: "Log4Shell" }
        ]
    });
});

// Changed PORT to avoid conflict with Cryptographic Failures (5001)
const PORT = Number(process.env.VULN_COMPONENTS_PORT) || 5002;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Vulnerable Components backend running at http://127.0.0.1:${PORT}`);
});
