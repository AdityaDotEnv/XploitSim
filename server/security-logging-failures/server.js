const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ⚠️ VULNERABLE: log file with weak permissions
const LOG_FILE = __dirname + "/weak-log.txt";

// Ensure log file exists
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, "=== Weak Security Log ===\n");
}

// ⚠️ VULNERABLE: Insecure logging function
function insecureLog(message) {
  fs.appendFileSync(LOG_FILE, message + "\n");
}

// 🟥 VULNERABLE: No logging at all
app.post("/api/no-logging-login", (req, res) => {
  const { username, password } = req.body;

  // Authentication with NO LOGGING
  if (username === "admin" && password === "admin123") {
    return res.json({ success: true, message: "Logged in (NO LOGGING)" });
  }

  res.json({ success: false, message: "Invalid credentials (NO LOGGING)" });
});

// 🟧 WEAK LOGGING — logs sensitive data
app.post("/api/weak-logging", (req, res) => {
  const { username, password } = req.body;

  insecureLog(
    `[WEAK LOG] Login attempt: username=${username}, password=${password}`
  );

  res.json({
    logged: true,
    message: "Weak logging stored (including sensitive data!)",
  });
});

// 🟨 INSUFFICIENT CONTEXT LOGGING
app.get("/api/log-no-context", (req, res) => {
  insecureLog("User performed an action"); // No timestamp, no IP, no user ID

  res.json({
    result: "Logged with no useful context",
  });
});

// 🟥 LOG TAMPERING — attacker can DELETE logs
app.post("/api/delete-logs", (req, res) => {
  fs.writeFileSync(LOG_FILE, "=== Logs Deleted by Attacker ===\n");

  res.json({ message: "Logs deleted (vulnerability demonstration)" });
});

// Return log contents
app.get("/api/view-logs", (req, res) => {
  const logs = fs.readFileSync(LOG_FILE, "utf-8");
  res.json({ logs });
});

app.listen(5600, () => {
  console.log("Security Logging Failures sandbox running at http://127.0.0.1:5600");
});
