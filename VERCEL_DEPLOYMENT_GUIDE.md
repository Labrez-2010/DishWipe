# DishWipe AI — Vercel Deployment Guide

## Exact Vercel Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Other |
| Root Directory | `.` (repo root — NOT `frontend`) |
| Build Command | Off — use `vercel.json` |
| Output Directory | Off — use `vercel.json` |
| Install Command | Off — use `vercel.json` |
| Node.js Version | 20.x |

## vercel.json Provides

```
installCommand:  npm run install:all
buildCommand:    npm run build --prefix frontend
outputDirectory: frontend/dist
```

## Environment Variables

None required for standard deployment.

## Deploy Steps

1. Verify lowercase filename:
   ```bash
   git ls-files | grep vercel
   # Must show: vercel.json
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Vercel Dashboard → Settings → General:
   - Root Directory: `.`
   - Turn OFF Build/Output/Install overrides

4. Redeploy latest commit

## Verify

```bash
curl -I https://YOUR-APP.vercel.app          # 200, not 404
curl https://YOUR-APP.vercel.app/api/health  # JSON response
```

## Common 404 Causes

| Misconfiguration | Fix |
|------------------|-----|
| File named `Vercel.json` | Rename to `vercel.json` |
| Root Directory = `frontend` | Set to `.` |
| Output = `frontend/dist` with Root = `frontend` | Turn off override |

## Architecture

```
/                          → frontend/dist/index.html
/api/health                → api/health.js
/api/recipes/recommend     → api/recipes/recommend.js
```
