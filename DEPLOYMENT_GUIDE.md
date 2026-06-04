# DishWipe AI — Deployment Guide

## Overview

Monorepo deployed as a single Vercel project: React SPA + serverless API in `api/`. Express backend in `backend/` is for local development only.

---

## 1. Local Setup

**Prerequisites:** Node.js 18+, npm 9+

```bash
git clone <repository-url>
cd dishwipe-ai
npm run install:all
cp backend/.env.example backend/.env
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

Vite proxies `/api/*` to the backend during development.

**Verify:**

```bash
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/recipes/recommend \
  -H "Content-Type: application/json" \
  -d "{\"ingredients\":[\"garlic\",\"pasta\"]}"
```

---

## 2. Environment Variables

### Frontend (Vite)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| VITE_API_URL | No | empty | API base URL. Empty = same-origin /api on Vercel |

### Backend (local / Render / Railway)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 5000 | Server port |
| NODE_ENV | No | development | Environment |
| FRONTEND_URL | Prod | — | CORS allowed origin |

**Standard Vercel deploy: no env vars required.**

---

## 3. Frontend + API on Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import in Vercel Dashboard
3. **Root Directory:** `.` (repository root — NOT `frontend`)
4. Deploy — `vercel.json` configures build automatically

**CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Post-deploy:**

```bash
curl https://YOUR-APP.vercel.app/api/health
```

Open `https://YOUR-APP.vercel.app` — landing page should load.

---

## 4. Backend on Render/Railway (Optional)

Only if you want standalone Express instead of Vercel serverless.

**Render:**
- Root Directory: `backend`
- Build: `npm install`
- Start: `npm start`
- Env: `NODE_ENV=production`, `FRONTEND_URL=https://your-app.vercel.app`
- Set `VITE_API_URL` on Vercel to Render URL and redeploy frontend

**Why not Vercel for Express?** Vercel is serverless-first. Use `api/` folder for production API.

---

## 5. Vercel Architecture

- `/` and all non-API routes → `frontend/dist/index.html` (SPA)
- `/api/health` → `api/health.js`
- `/api/recipes/recommend` → `api/recipes/recommend.js`

---

## 6. Troubleshooting

### 404 NOT_FOUND

- Set Vercel Root Directory to `.` not `frontend`
- Confirm `npm run build` creates `frontend/dist/index.html`
- Redeploy from Vercel dashboard

### API 404 on Vercel

- Root must include `api/` folder
- Use POST for `/api/recipes/recommend`

### Request failed in browser

- Local: ensure backend is running
- Separate backend: set `FRONTEND_URL` and `VITE_API_URL`

### undefined% Match badge

- Deploy latest code with `matchPercentage` in API response

---

## Quick Reference

```bash
npm run install:all   # Install deps
npm run dev           # Dev servers
npm run build         # Production build
npm run lint          # ESLint
vercel --prod         # Deploy
```
