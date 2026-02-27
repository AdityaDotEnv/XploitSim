# XploitSim Deployment Guidelines

To deploy XploitSim effectively, you need to handle the **Frontend (Netlify)** and the **Backend (Render/Railway/Fly.io)** separately, as the backend microservices require a persistent Node.js environment.

---

## 1. Frontend Deployment (Netlify)

The frontend is a Vite + React application.

### Build Settings
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18 or higher (set via `NODE_VERSION` env var or `netlify.toml`).

### Environment Variables
You MUST set the following environment variable in the Netlify UI (Site Settings > Build & deploy > Environment):
- `VITE_API_URL`: The full URL of your deployed API Gateway (e.g., `https://xploitsim-api.onrender.com`).

### Configuration File (`netlify.toml`)
I have already created a `netlify.toml` in your root directory. It handles:
- The build command and publish directory.
- Single Page Application (SPA) redirects to prevent 404s on browser refresh.

---

## 2. Backend Deployment

Since XploitSim uses a microservices architecture with multiple Express servers, it cannot be hosted directly on Netlify's static hosting.

### Recommended Provider: **Render** or **Railway**
These platforms are excellent for hosting Node.js microservices.

#### Option A: Unified Deployment (Using Gateway)
If you want to deploy the entire `server/` folder as one service:
1. Point the service to the `server/` directory.
2. **Build Command:** `npm install`
3. **Start Command:** `npm start` (This will use the `concurrently` script in `server/package.json`).
4. **PORT:** High memory might be needed to run 11 services concurrently.

#### Option B: Split Microservices
For better scalability, deploy each folder in `server/` as an individual service. 
- You would need to update the `proxies` map in `gateway.ts` to point to the new service URLs instead of `localhost`.

### Database Persistence
- The app uses SQLite. For persistent data on Render/Railway, you should use **Persistent Disks** or migrate the DB connection to a hosted Postgres/MySQL instance if scaling.

---

## 3. Smooth Deployment Checklist

1. [ ] **Backend First**: Deploy the backend and get the Gateway URL.
2. [ ] **Frontend Env**: Add `VITE_API_URL` to Netlify with the Backend URL.
3. [ ] **Deploy Frontend**: Connect your GitHub repo to Netlify.
4. [ ] **Verification**: Open the Netlify URL and check the "Authentication Sandbox" to see if it connects to the backend.

> [!TIP]
> If you encounter CORS issues, ensure the `CORS` origins in the backend servers include your new Netlify URL (e.g., `https://your-site.netlify.app`).
