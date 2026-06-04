# DishWipe AI — Product Requirements Document

**Version:** 1.0  
**Last Updated:** June 4, 2026  
**Status:** MVP — Production Ready

---

## Vision

DishWipe AI helps home cooks discover recipes they can make with ingredients they already have. Users enter what's in their kitchen and swipe through personalized recipe matches — like a dating app for food.

---

## Problem

People frequently ask: *"What can I cook with what I have?"* Traditional recipe search requires knowing a dish name or browsing endlessly. DishWipe AI solves this with ingredient-based matching and a swipe-based UX that ranks recipes by match percentage.

---

## Users

- **Primary:** Home cooks (18–45) who cook regularly and want to reduce food waste
- **Secondary:** Students and budget-conscious meal planners

---

## Features

### Implemented

- Ingredient input with tag chips
- Mock AI ingredient suggestions
- Recipe recommendation API (top 5 from 25 recipes)
- Match scoring with partial ingredient matching
- Tinder-style swipe interface (drag + buttons)
- Recipe cards with image, time, calories, difficulty, match %
- Missing ingredients overlay (hold info button)
- Recipe detail modal with step-by-step instructions
- Session saved-recipe counter
- Health check API
- Responsive mobile-first design
- Framer Motion animations

### Missing / Planned

- Real AI integration (OpenAI/Gemini)
- Persistent saved recipes
- User authentication
- Dietary filters
- Shopping list generation
- Deep linking / share URLs

---

## User Flow

1. **Landing Page** — Branding and ingredient input
2. **Search** — User adds ingredient tags
3. **AI Processing** — Mock suggestion (future: LLM)
4. **Recipe Analysis** — Backend scores recipes
5. **Results** — Swipe through top 5 matches
6. **Saved Recipes** — In-session counter only

---

## Technical Architecture

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Framer Motion |
| Backend (local) | Node.js, Express 5, express-validator, Helmet |
| Backend (Vercel) | Serverless functions in `api/` |
| Database | None — static JSON (25 recipes) |
| External APIs | Unsplash images only |
| Authentication | None |

---

## Risks

| Category | Risk | Mitigation |
|----------|------|------------|
| Deployment | Serverless cold starts | Monitor latency |
| Deployment | Express vs serverless drift | Shared service modules |
| Security | No rate limiting | Vercel Firewall |
| Security | Open CORS in dev | `FRONTEND_URL` allowlist |
| Scalability | Static 25-recipe dataset | Future database |
