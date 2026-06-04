# DishWipe AI — Deployment Analysis

**Date:** June 4, 2026  
**Symptom:** Vercel status "Ready", URL returns **404 NOT_FOUND**

---

## Exact Root Cause of 404

### Primary: Config filename case mismatch

**Evidence:**
- `git ls-files` tracked `Vercel.json` (capital V), not `vercel.json`
- `git show HEAD:vercel.json` → `fatal: path 'vercel.json' exists on disk, but not in 'HEAD'`
- Vercel on Linux only reads **`vercel.json`** (lowercase)

**Result:** Vercel ignored all build/output configuration.

### Secondary: Previous invalid schema

**Evidence (`git show 913ba00:Vercel.json`):**
```json
{ "experimentalServices": { "frontend": { ... }, "backend": { ... } } }
```

`experimentalServices` is not valid Vercel config — also ignored.

### Tertiary: Monorepo root has no static files

- No `index.html` at repository root
- Without valid `vercel.json`: no buildCommand, no outputDirectory
- Deploy completes but nothing served at `/` → 404

---

## Ruled Out

| Candidate | Evidence |
|-----------|----------|
| Build fails | `npm run build` passes; `frontend/dist/index.html` exists |
| React Router issue | App uses component state, not React Router |
| Missing serverless API | `api/health.js` and `api/recipes/recommend.js` present |

---

## Build Verification

| Check | Result |
|-------|--------|
| Vite app | Yes — `frontend/vite.config.js` |
| `npm run build` | Pass |
| `dist/index.html` | Generated |
| `npm run lint` | Pass |

---

## Backend on Vercel

| Question | Answer |
|----------|--------|
| Express on Vercel? | No — `app.listen()` incompatible |
| Production API | `api/` serverless functions |
| Separate deploy? | No for standard setup |

---

## Fixes Applied

1. Renamed `Vercel.json` → `vercel.json` (git-tracked lowercase)
2. Simplified `vercel.json` rewrites
3. Updated `.gitignore` for env files

---

## Remaining Blocker

**Push changes to GitHub and redeploy.** Vercel cannot pick up the fix until the lowercase `vercel.json` is on the remote.
