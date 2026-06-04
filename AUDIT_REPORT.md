# DishWipe AI — Repository Audit Report

**Audit Date:** June 4, 2026  
**Scope:** Monorepo — frontend (Vite + React), backend (Node.js + Express), Vercel deployment

---

## Executive Summary

The repository is a monorepo with a React SPA frontend and Express backend. The primary production blocker was a **404 NOT_FOUND on Vercel** caused by missing root-level deployment configuration and no serverless API layer. The Express backend cannot run as a long-lived process on Vercel without conversion to serverless functions.

Additional runtime bugs were found in API response shape mismatches between frontend and backend, missing static assets, and incomplete environment variable documentation.

---

## Critical Issues (Fixed)

| # | Issue | Impact | Status |
|---|-------|--------|--------|
| C1 | No root `vercel.json` — previous experimental config was deleted | 404 NOT_FOUND on all routes | Fixed |
| C2 | Backend not deployable on Vercel — Express `app.listen()` incompatible | API calls fail in production | Fixed — `api/` serverless functions |
| C3 | Field mismatch — API returns `matchScore`; UI reads `matchPercentage` | Match badge shows undefined | Fixed |
| C4 | Missing recipe fields — UI expects `steps`, `calories` | Detail modal crashes | Fixed |
| C5 | Duplicate/conflicting Vercel config in `frontend/` | Unpredictable routing | Fixed — single root config |

---

## High Priority Issues (Fixed)

| # | Issue | Status |
|---|-------|--------|
| H1 | Missing favicon (`/favicon.svg` referenced but absent) | Fixed |
| H2 | Root `start` script broken — frontend had no `start` script | Fixed |
| H3 | No `.env.example` at root or frontend | Fixed |
| H4 | CORS wide open | Fixed — origin allowlist |
| H5 | No 404 handler on Express | Fixed |
| H6 | Generic page title | Fixed |

---

## Medium Priority Issues

| # | Issue | Status |
|---|-------|--------|
| M1 | ESLint errors | Fixed |
| M2 | No API URL configuration | Fixed — `VITE_API_URL` |
| M3 | `cookTime` type inconsistency | Fixed |
| M4 | No security headers in production | Fixed — Vercel headers |
| M5 | No rate limiting | Open — document for Vercel WAF |
| M6 | No automated tests | Open |
| M7 | AI suggestions are mocked | By design (MVP) |

---

## Low Priority Issues

| # | Issue | Status |
|---|-------|--------|
| L1 | Saved recipes not persisted | Open |
| L2 | No React Router / deep linking | Acceptable for MVP |
| L3 | Stale frontend README | Root README added |
| L4 | Unused `icons.svg` asset | Low impact |
| L5 | No TypeScript | Acceptable for MVP |
| L6 | Partial substring ingredient matching | Documented |

---

## Recommended Future Work

1. Add unit tests for recommendation service and API handlers
2. Persist saved recipes (localStorage or Supabase)
3. Integrate real AI (OpenAI/Gemini)
4. Add rate limiting
5. Migrate to TypeScript
