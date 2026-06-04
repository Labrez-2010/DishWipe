# DishWipe AI

Swipe-based recipe discovery app. Enter ingredients from your kitchen, get AI-style suggestions, and swipe through personalized recipe matches.

## Quick Start

```bash
npm run install:all
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
├── api/                  # Vercel serverless functions (production API)
├── backend/              # Express API (local development & optional external deploy)
├── frontend/             # Vite + React SPA
├── vercel.json           # Vercel deployment configuration
├── PRD.md                # Product requirements
├── AUDIT_REPORT.md       # Repository audit findings
├── FIX_REPORT.md         # Bug fixes applied
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
└── FINAL_STATUS.md       # Production readiness summary
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install root, frontend, and backend dependencies |
| `npm run dev` | Run frontend and backend concurrently |
| `npm run build` | Build frontend for production |
| `npm run start` | Preview frontend + start backend |
| `npm run lint` | Run ESLint on frontend |

## Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full deployment instructions.
