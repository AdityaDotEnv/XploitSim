# 🧠 XploitSim – Interactive OWASP Vulnerability Sandbox

🚀 **Live Demo:** https://xploitsim.netlify.app  
💻 **Built With:** React, Vite, Node.js (multi-server sandbox), SQLite

---

# ⚡ Overview

**XploitSim** is an interactive, safe, and visual sandbox designed to demonstrate **OWASP Top 10 vulnerabilities** using isolated backend microservers and a unified React/Vite frontend.

Each vulnerability module contains:

- 📘 A clear explanation of the vulnerability  
- 💣 A live “Try it Yourself” simulation  
- 🛡 Secure coding & prevention insights  
- 🧪 A backend server intentionally configured to be insecure for learning purposes  

This platform helps students, developers, and cybersecurity learners **see attacks happen**, understand the mechanics, and explore mitigations — all safely.

---

# 🔥 Supported Vulnerabilities

Each vulnerability is implemented as an **independent backend microservice** and a **frontend demonstration component**.

| OWASP ID | Vulnerability Name                        | Port  | Status      |
|----------|--------------------------------------------|-------|-------------|
| **A01**  | Broken Access Control                      | 4000  | ✅ Active   |
| **A02**  | Cryptographic Failures                     | 5001  | ✅ Active   |
| **A03**  | Injection                                   | 5100  | ✅ Active   |
| **A04**  | Insecure Design                             | 5200  | ✅ Active   |
| **A05**  | Security Misconfiguration                   | 5300  | ✅ Active   |
| **A06**  | Vulnerable & Outdated Components           | 5050  | ✅ Active   |
| **A07**  | Authentication Failures                    | N/A   | ✅ Active   |
| **A08**  | Software & Data Integrity Failures         | 5400  | ✅ Active   |
| **A09**  | Security Logging & Monitoring Failures     | 5600  | ✅ Active   |
| **A10**  | Server-Side Request Forgery (SSRF)         | 5500  | ✅ Active   |

---

# 🧩 Vulnerability Modules Overview

### 🔓 **A01 – Broken Access Control**
- Missing authorization checks  
- Privilege escalation  
- Insecure direct object references  
- SQLite sandbox  

### 🔐 **A02 – Cryptographic Failures**
- Weak hashing & key handling  
- Sensitive data exposure  
- SQLite crypto demo  

### 💉 **A03 – Injection**
- SQL Injection sandbox  
- Dynamic query tampering  
- SQLite DB seeding  

### 🏗 **A04 – Insecure Design**
- Flawed architecture  
- Missing validation layers  
- Unsafe trust boundaries  

### ⚙ **A05 – Security Misconfiguration**
- Misconfigured headers  
- Unrestricted CORS  
- Verbose errors  
- Hard-coded secrets  

### 📦 **A06 – Vulnerable & Outdated Components**
- Uses intentionally outdated dependencies  
- Demonstrates supply-chain risks  
- Simple fetch demo  
- Runs on **127.0.0.1:5050**

### 🔐 **A07 – Authentication Failures**
- Demonstrates common authentication weaknesses:
  - Weak password policies and insecure password storage  
  - Brute force / credential stuffing simulations  
  - Session management flaws (predictable session IDs, missing expiration)  
  - Missing multi-factor authentication (MFA) and ineffective account lockout  
- Demo features:
  - A manual login & registration flow that stores credentials in a sandbox DB
  - An automated credential-stuffing tool to visualize brute-force impact
  - Account lockout and rate-limit bypass examples
  - Console logs showing attack progression to aid learning
- Typical learning outcomes:
  - How poor password & session handling leads to account takeover
  - How MFA and secure session handling mitigate attacks
  - Practical remediation steps (hashing salts, bcrypt/argon2, rate limiting, MFA)

### 🧩 **A08 – Software & Data Integrity Failures**
- Demonstrates unsigned/tampered update packages  
- Shows lack of integrity verification  
- Includes safe vs unsafe update comparison  
- Runs on **127.0.0.1:5400**  
- “Try it Yourself” toggle loads the interactive demo  

### 📝 **A09 – Security Logging & Monitoring Failures**

- Demonstrates OWASP A09:2021 – Security Logging & Monitoring Failures**, how insufficient or incorrect logging enables attackers to operate undetected.
- No logging of critical security events  
- Logging sensitive data such as passwords  
- Logs with no contextual information (missing timestamp, user-agent, IP)  
- Log tampering and deletion  
- Viewing raw, unstructured logs vs structured logs
- **Login (No Logging)** → server authenticates but logs nothing  
- **Weak Logging** → logs passwords and sensitive data  
- **Log With No Context** → logs minimal, useless information  
- **Delete Logs (Tampering)** → simulates an attacker wiping audit trails  
- **View Log File** → displays current insecure log output  

A custom log viewer (left panel) shows:
- Realistic multiline logs  
- Tampering effects  
- Unstructured entries  
- Sensitive data leakage  


### 🔄 **A10 – Server-Side Request Forgery (SSRF)**
- Allows user-supplied URLs to be fetched by the backend  
- Demonstrates how attackers:
  - Access internal network services  
  - Query cloud metadata endpoints  
  - Perform internal port scanning  
  - Bypass firewalls via the backend  
- Demo features:
  - Input box for arbitrary URLs  
  - Examples card with common SSRF payloads  
  - Response viewer showing internal service leaks  
- Runs on **127.0.0.1:5500**  
- Includes unsafe endpoint (`/api/ssrf`) + safe comparison endpoint

---

# 🛠️ Setup & Configuration

## 1️⃣ Clone the Repository

git clone https://github.com/AdityaDotEnv/XploitSim.git  
cd XploitSim

---

## 2️⃣ Install Frontend Dependencies

npm install

---

## 3️⃣ Install All Backend Vulnerability Modules

cd server  
npm install    # root backend utilities  

Install each module:

npm install --prefix broken-access-control  
npm install --prefix cryptographic-failures  
npm install --prefix injection  
npm install --prefix insecure-design
npm install --prefix security-misconfiguration 
npm install --prefix vulnerable-components
npm install --prefix software-data-integrity
npm install --prefix security-logging-failures
npm install --prefix server-side-request-forgery

---

## 4️⃣ Seed the Injection Database (Only Once)

npm install sqlite3  
npm install sqlite  
npm run seed --prefix injection

Expected output:  
“Seeded injection.sqlite with users table.”

---

## 5️⃣ Start ALL Backend Services (ONE COMMAND)

cd server  
npm start

This launches:

- A01 → http://localhost:4000  
- A02 → http://localhost:5001  
- A03 → http://localhost:5100  
- A04 → http://localhost:5200  
- A05 → http://localhost:5300  
- A06 → http://127.0.0.1:5050  
- A08 → http://127.0.0.1:5400  
- A00 → http://127.0.0.1:5600
- A10 → http://127.0.0.1:5500

---

## 6️⃣ Start the Frontend (React + Vite)

cd frontend  
npm install   # first time only  
npm run dev

Open the app:  
http://localhost:5137

---

# ⚙️ Build for Production

npm run build

Optimized build located in:

./build

Deployable to Netlify, Vercel, or static hosting.

---

# 🚀 Full Workflow Summary

## Terminal 1: Backend
cd server  
npm start

## Terminal 2: Frontend 
npm run dev

---

# 🧱 Tech Stack

| Layer           | Technology                   |
|----------------|-------------------------------|
| Frontend       | React + Vite                  |
| Styling        | CSS Modules + Inline CSS      |
| Backend        | Node.js (multiple microservers) |
| Databases      | SQLite                         |
| Routing        | React Router                  |
| Deployment     | Netlify                       |
| Package Mgmt   | NPM                           |

---

# 🧠 Vision

XploitSim aims to bridge the gap between **cybersecurity theory and hands-on practical learning**.

Instead of static definitions, users can:

- Watch insecure systems behave in real-time  
- Simulate cyber attacks safely  
- Interact with insecure code  
- Study mitigation techniques  
- Understand each OWASP risk deeply  

**Goal:**  
> Make every OWASP Top 10 vulnerability accessible, interactive, and safe for learners worldwide.
