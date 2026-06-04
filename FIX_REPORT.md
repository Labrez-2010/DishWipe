# DishWipe AI — Fix Report

**Date:** June 4, 2026  
**Total Fixes Applied:** 18

See AUDIT_REPORT.md for issue classification. This document records each fix with root cause, change, and verification.

---

## Fix 1: Root Vercel Deployment Configuration

**Root Cause:** No valid `vercel.json` at repo root; deleted experimental config caused 404 NOT_FOUND.

**Change:** Created root `vercel.json` with install/build/output commands, SPA rewrites, and security headers.

**Verified:** `npm run build` succeeds; `frontend/dist/index.html` generated.

---

## Fix 2: Vercel Serverless API

**Root Cause:** Express `app.listen()` cannot run on Vercel.

**Change:** Added `api/health.js` and `api/recipes/recommend.js` serverless handlers importing shared backend logic.

**Verified:** Handlers load without express-validator dependency.

---

## Fix 3: matchPercentage Field

**Root Cause:** API returned `matchScore` only; UI read `matchPercentage`.

**Change:** Added `matchPercentage` to recommendation service response.

**Verified:** API returns `"matchPercentage": 40`.

---

## Fix 4: steps and calories Fields

**Root Cause:** Detail modal called `steps.map()` on undefined.

**Change:** Added `buildSteps()` and `estimateCalories()` in recommendation service.

**Verified:** API response includes both fields.

---

## Fix 5–18: Additional Fixes

| Fix | File(s) | Summary |
|-----|---------|---------|
| 5 | recommendationService.js | Format cookTime as "20 min" |
| 6 | frontend/vercel.json | Deleted conflicting config |
| 7 | frontend/public/favicon.svg | Created missing favicon |
| 8 | frontend/index.html | Title + meta description |
| 9 | frontend/src/config/api.js, App.jsx | VITE_API_URL support |
| 10 | package.json | Fixed build and start scripts |
| 11 | backend/src/index.js | CORS, 404 handler, conditional listen |
| 12 | InputView.jsx | Removed setState in useEffect |
| 13 | SwipeCard.jsx | Removed unused imports |
| 14 | SwipeView.jsx | Alt text + defensive steps |
| 15 | .env.example files | Documented all env vars |
| 16 | recommendRequestValidation.js | Serverless-safe validation |
| 17 | README.md | Project documentation |
| 18 | vercel.json | Security headers |

---

## Build Verification

| Command | Result |
|---------|--------|
| npm run build | Pass |
| npm run lint | Pass |
| GET /api/health | Pass |
| POST /api/recipes/recommend | Pass |

---

## Remaining Known Issues

1. No automated tests
2. No rate limiting
3. Saved recipes not persisted
4. AI suggestions are mocked
5. Substring ingredient matching may false-positive
