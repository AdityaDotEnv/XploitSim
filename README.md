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

# 🔥 Supported Vulnerabilities (Current Modules)

Each vulnerability is implemented as an **independent backend microservice** and a **frontend demonstration component**.

| OWASP ID | Vulnerability Name                        | Port  | Status      |
|----------|--------------------------------------------|-------|-------------|
| **A01**  | Broken Access Control                      | 4000  | ✅ Active   |
| **A02**  | Cryptographic Failures                     | 5001  | ✅ Active   |
| **A03**  | Injection                                   | 5100  | ✅ Active   |
| **A04**  | Insecure Design                             | 5200  | ✅ Active   |
| **A05**  | Security Misconfiguration                   | 5300  | ✅ Active   |
| **A06**  | Vulnerable & Outdated Components           | 5050  | ✅ Active      |
| **A08**  | Software & Data Integrity Failures         | 5400  | ✅ Active    |

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

### 🧩 **A08 – Software & Data Integrity Failures**
- Demonstrates unsigned/tampered update packages  
- Shows lack of integrity verification  
- Includes safe vs unsafe update comparison  
- Runs on **127.0.0.1:5400**  
- “Try it Yourself” toggle loads the interactive demo  

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
npm install --prefix software-data-integrity     # NEW

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

Ready for deployment to Netlify, Vercel, or static hosting.

---

# 🚀 Full Workflow Summary

## Terminal 1: Backend
cd server  
npm start

## Terminal 2: Frontend
cd frontend  
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

