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

| OWASP ID | Vulnerability Name                      | Port  | Status |
|---------|------------------------------------------|-------|--------|
| **A01** | Broken Access Control                     | 4000  | ✅ Active |
| **A02** | Cryptographic Failures                    | 5001  | ✅ Active |
| **A03** | Injection                                  | 5100  | ✅ Active |
| **A04** | Insecure Design                            | 5200  | ✅ Active |
| **A05** | Security Misconfiguration                  | 5300  | ✅ Active |
| **A06** | Vulnerable & Outdated Components          | 5051  | 🆕 NEW |

---

# 🧩 Vulnerability Modules Overview

### 🔓 **A01 – Broken Access Control**
- Missing authorization checks  
- Privilege escalation  
- Insecure direct object references  
- SQLite backend included  

### 🔐 **A02 – Cryptographic Failures**
- Weak hashing  
- Poor secrets handling  
- Sensitive data exposure  
- SQLite crypto demo  

### 💉 **A03 – Injection**
- SQL Injection demonstration  
- Editable sandbox with SQLite seeding  
- Query tampering demo  

### 🏗 **A04 – Insecure Design**
- Flawed architectural decisions  
- Missing validation layers  
- Unsafe trust boundaries  

### ⚙ **A05 – Security Misconfiguration**
- Missing headers  
- Overly verbose errors  
- Unrestricted CORS  
- Hard-coded secrets  

### 📦 **A06 – Vulnerable & Outdated Components** (NEW)
- Backend intentionally uses outdated npm packages  
- Demonstrates exploitability of unpatched libraries  
- Frontend includes “Try it Yourself” fetch demo  
- Runs on **127.0.0.1:5050**  

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
npm install --prefix vulnerable-components   # NEW

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

- Broken Access Control → http://localhost:4000  
- Cryptographic Failures → http://localhost:5001  
- Injection → http://localhost:5100  
- Insecure Design → http://localhost:5200  
- Security Misconfiguration → http://localhost:5300  
- Vulnerable Components → http://127.0.0.1:5050  

---

## 6️⃣ Start the Frontend (React + Vite)

cd frontend  
npm install   # first time only  
npm run dev

Visit the app:

http://localhost:5137

---

# ⚙️ Build for Production

npm run build

Outputs optimized build to:

./build

Deployable on Netlify, Vercel, or any static hosting.

---

# 🚀 Full Workflow Summary

## Terminal 1 (Backend)
cd server  
npm start

## Terminal 2 (Frontend)
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

XploitSim aims to bridge the gap between **cybersecurity theory and practical hands-on learning**.

Instead of reading static definitions, learners can:

- Explore real insecure code  
- Perform attacks safely  
- Study mitigation strategies  
- Understand real OWASP Top 10 risks  

**Goal:**  
> Make every OWASP vulnerability accessible, interactive, and safe for learners worldwide.
