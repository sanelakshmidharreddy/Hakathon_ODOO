# SunPower Solutions — Deployment Guide

## 1. Architecture & Live Deployments
- **Frontend URL**: [https://hakathonodoo.vercel.app](https://hakathonodoo.vercel.app/)
- **Backend URL**: [https://hakathon-odoo.onrender.com](https://hakathon-odoo.onrender.com/)

---

## 2. Vercel Frontend Deployment

### Automatic GitHub CI/CD
Whenever code is pushed to `main`, Vercel automatically detects changes, executes the build pipeline, and deploys to the global edge network.

### Vercel Project Settings
- **Root Directory**: `.` (Root) or `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `cd frontend && npm install && npm run build` (or `npm run build` if Root Directory is `frontend`)
- **Output Directory**: `frontend/dist` (or `dist` if Root Directory is `frontend`)

### Environment Variables on Vercel
Set these in the **Vercel Dashboard → Project Settings → Environment Variables**:
| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://hakathon-odoo.onrender.com` | Production Render backend URL |
| `VITE_APP_NAME` | `SunPower Solutions` | Application title |

### Single-Page Application (SPA) Fallback
To ensure direct deep-link navigation (e.g. `/leads`, `/dashboard`, `/quotes`) and page refreshes work without returning a 404, Vercel uses `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/index.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 3. Render Backend Deployment

### Render Web Service Settings
- **Service Name**: `sunpower-solutions-backend`
- **Runtime**: `Python 3.11` (or `Node.js 20+`)
- **Root Directory**: `.` (or `backend`)
- **Build Command**:
  - Python FastAPI: `pip install -r requirements.txt` (or `cd backend && pip install -r requirements.txt`)
  - Node.js Express: `npm install && npm run build`
- **Start Command**:
  - Python FastAPI: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Node.js Express: `npm run start` (or `node backend/dist/server.js`)
- **Health Check Path**: `/health`

### Environment Variables on Render
Set these in **Render Dashboard → Environment**:
| Variable Name | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `10000` (Injected automatically by Render) | Listening port |
| `FRONTEND_URL` | `https://hakathonodoo.vercel.app` | CORS allowed origin |
| `CORS_ORIGIN` | `https://hakathonodoo.vercel.app` | Backup CORS allowlist |
| `DATABASE_URL` | `postgresql://user:pass@host:5432/sunpower` | Production PostgreSQL connection string |
| `JWT_SECRET` | Strong random string (32+ chars) | Token signature key |
| `OPENWEATHER_API_KEY` | Your OpenWeather API key | Live irradiance/cloud telemetry |

---

## 4. CORS & Origin Configuration
Cross-Origin Resource Sharing (CORS) is configured dynamically to permit:
- `https://hakathonodoo.vercel.app` (Live Vercel Production App)
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` / `http://localhost:5000` (Local testing)
- Mobile PWA / Requests with no origin (e.g. curl, native apps)

---

## 5. Redeployment Workflow
To deploy updates to both environments:
1. Make your changes and verify builds locally:
   ```bash
   cd frontend && npm run build
   cd ../backend && npm run build
   ```
2. Run the deployment verification test:
   ```bash
   node scripts/deploy-check.js
   ```
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "feat: your descriptive message"
   git push origin main
   ```
4. Both Vercel and Render will automatically trigger rolling zero-downtime builds.
