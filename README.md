# 🧠 XploitSim – Interactive OWASP Vulnerability Sandbox

🚀 **Live Demo:** [xploitsim.render.com](https://xploitism.onrender.com)  
💻 **Built With:** React, Vite, Node.js (Centralized Backend), SQLite

---

# ⚡ Overview

**XploitSim** is an interactive, safe, and visual sandbox designed to demonstrate **OWASP Top 10 vulnerabilities** using a unified React/Vite frontend and a centralized Node.js backend system.

The project has been refactored to follow a **Feature-Based Architecture**, making it highly modular and easy to navigate. Each vulnerability module is self-contained with its own UI, assets, and backend logic.

### Each module provides:
- 📘 **Deep Dives**: Clear explanations of the vulnerability.
- 💣 **Interactive Sandboxes**: Live “Try it Yourself” simulations.
- 🛡 **Defense Strategies**: Secure coding & prevention insights.
- 🧪 **Vulnerable Labs**: Backend endpoints intentionally configured for hands-on learning.

---

# 🔥 Feature-Based Architecture

The project follows a modular structure where code is organized by feature domain rather than file type.

```text
src/
├── features/               # Domain-specific modules
│   ├── injection/          # e.g., SQL Injection feature
│   │   ├── components/     # UI components for this feature
│   │   └── assets/         # Feature-specific styles & images
│   ├── broken-access-control/
│   └── ...                 # Other OWASP categories
├── layouts/                # Shared layout components (Navbar, Footer)
├── pages/                  # Route entry points (Home, About)
└── assets/                 # Global styles and static files
```

---

# 🌐 Supported Vulnerabilities (Port Map)

All vulnerabilities are active and centralized. You can start all of them with a single command.

| OWASP ID | Vulnerability Name                        | Backend Port | Status      |
|----------|--------------------------------------------|--------------|-------------|
| **A01**  | Broken Access Control                      | 4000         | ✅ Active   |
| **A02**  | Cryptographic Failures                     | 5001         | ✅ Active   |
| **A03**  | Injection                                   | 5100         | ✅ Active   |
| **A04**  | Insecure Design                             | 5200         | ✅ Active   |
| **A05**  | Security Misconfiguration                   | 5300         | ✅ Active   |
| **A06**  | Vulnerable & Outdated Components           | 5002         | ✅ Active   |
| **A07**  | Authentication Failures                    | Internal     | ✅ Active   |
| **A08**  | Software & Data Integrity Failures         | 5400         | ✅ Active   |
| **A09**  | Security Logging & Monitoring Failures     | 5600         | ✅ Active   |
| **A10**  | Server-Side Request Forgery (SSRF)         | 5500         | ✅ Active   |

---

# 🛠️ Setup & Local Development

We have simplified the setup process. You no longer need to manage multiple `package.json` files manually.

### 1️⃣ Clone and Install
```bash
git clone https://github.com/AdityaDotEnv/XploitSim.git
cd XploitSim
npm install
```
> [!NOTE]
> The `npm install` command at the root automatically installs all backend dependencies for you!

### 2️⃣ Run the Entire Project
```bash
npm run dev
```
This single command:
1. Starts the **Vite Frontend** (React).
2. Starts **All Backend Microservices** concurrently.

### 3️⃣ View the App
Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

# 🐳 Docker Support

XploitSim is fully containerized for easy local testing and production deployment.

### Run with Docker
```bash
# Build the image
docker build -t xploitsim .

# Run the container
docker run -p 10000:10000 xploitsim
```
The app will be available at [http://localhost:10000](http://localhost:10000).

---

# 🚀 Deployment (Render)

This project is optimized for deployment on **Render** (or any Docker-capable host). 

1. Create a new **Web Service** on Render.
2. Connect your repository.
3. Select **Docker** as the Runtime.
4. Render will automatically use the `Dockerfile` to build and deploy both the frontend and all 9 backend microservices in a single container.

---

# 🔌 Backend Commands (Optional)

If you only want to work on the servers:
- `npm run server`: Starts all backend vulnerability servers.
- `npm run seed --prefix server/injection`: Re-seeds the injection database.

---

# 🧱 Tech Stack

| Layer           | Technology                   |
|----------------|-------------------------------|
| **Frontend**     | React 19 + Vite               |
| **Architecture** | Feature-Based (Bulletproof)   |
| **Backend**      | Node.js + Express             |
| **Database**     | SQLite 3                      |
| **Styling**      | Vanilla CSS + CSS Modules     |
| **Deployment**   | Docker + Render Gateway       |
| **Concurrency**  | Concurrently (Unified Start)  |

---

# 🧠 Vision & Learning

XploitSim is built for **hands-on security education**. It bridges the gap between theory and practice by allowing you to break things in a safe, controlled local environment.

**Goal:** Make web security accessible, interactive, and fun for developers and students.
