import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../../.env") });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const LOG_FILE = join(__dirname, "..", "data", "weak-log.txt");

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, "=== Weak Security Log ===\n");
}

function insecureLog(message: string): void {
  fs.appendFileSync(LOG_FILE, message + "\n");
}

app.post("/api/no-logging-login", (req: Request, res: Response): any => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    return res.json({ success: true, message: "Logged in (NO LOGGING)" });
  }
  res.json({ success: false, message: "Invalid credentials (NO LOGGING)" });
});

app.post("/api/weak-logging", (req: Request, res: Response) => {
  const { username, password } = req.body;
  insecureLog(`[WEAK LOG] Login attempt: username=${username}, password=${password}`);
  res.json({
    logged: true,
    message: "Weak logging stored (including sensitive data!)",
  });
});

app.get("/api/log-no-context", (req: Request, res: Response) => {
  insecureLog("User performed an action");
  res.json({ result: "Logged with no useful context" });
});

app.post("/api/delete-logs", (req: Request, res: Response) => {
  fs.writeFileSync(LOG_FILE, "=== Logs Deleted by Attacker ===\n");
  res.json({ message: "Logs deleted (vulnerability demonstration)" });
});

app.get("/api/view-logs", (req: Request, res: Response) => {
  try {
    const logs = fs.readFileSync(LOG_FILE, "utf-8");
    res.json({ logs });
  } catch (err) {
    res.json({ logs: "Error reading logs." });
  }
});

app.post("/api/log-events", (req: Request, res: Response) => {
    const { events } = req.body || {};
    if (events && Array.isArray(events)) {
        events.forEach(event => {
            const status = event.success ? "SUCCESS" : "FAILURE";
            insecureLog(`[EVENT] ${new Date().toISOString()} - ${event.username} - ${event.ip} - ${status}`);
        });
    }
    const logs = fs.readFileSync(LOG_FILE, "utf-8");
    res.json({ logs: logs.split("\n").map(line => {
        if (line.includes("[EVENT]")) {
            const parts = line.split(" - ");
            return {
                timestamp: parts[0].replace("[EVENT] ", ""),
                username: parts[1],
                ip: parts[2],
                success: parts[3] === "SUCCESS",
                event: "Login Attempt"
            };
        }
        return null;
    }).filter(Boolean) });
});

const PORT = Number(process.env.LOGGING_PORT) || 5600;
app.listen(PORT, () => {
  console.log(`Security Logging Failures sandbox running at http://127.0.0.1:${PORT}`);
});
