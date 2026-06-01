# DishWipe AI - Backend

The backend for DishWipe AI, a recipe recommendation engine based on user ingredients. Built with Node.js, Express, and JavaScript.

## Features
- Scalable modular architecture (Routes, Controllers, Services).
- Recipe recommendation engine with match scoring.
- Input validation using `express-validator`.
- Security and logging with `helmet` and `morgan`.
- Centralized error handling.
- Mock recipe dataset with 25 diverse dishes.
- Future-ready for OpenAI/Gemini & Supabase integrations.

## Tech Stack
- Node.js
- Express.js
- dotenv
- cors
- helmet
- morgan
- express-validator

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root of the `backend` directory (or use the provided `.env.example` as a reference):
```env
PORT=5000
NODE_ENV=development
```

## Running the App

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Documentation

### Health Check
**Endpoint**: `GET /api/health`

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "DishWipe API running"
}
```

### Recipe Recommendations
**Endpoint**: `POST /api/recipes/recommend`

**Request Body**:
```json
{
  "ingredients": [
    "tomato",
    "onion",
    "garlic",
    "pasta"
  ]
}
```

**Response (200 OK)**:
```json
{
  "success": true,
  "recipes": [
    {
      "id": "dish_001",
      "title": "Garlic Pasta",
      "matchScore": 40,
      "cookTime": 20,
      "difficulty": "Easy",
      "image": "https://...",
      "description": "A simple and delicious garlic and olive oil pasta.",
      "ingredientsUsed": ["garlic", "pasta"],
      "missingIngredients": ["olive oil", "parmesan cheese", "parsley"]
    },
    ... // Top 5 recipes
  ]
}
```

**Validation Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Validation failed: Ingredients must be an array"
}
```

## Testing with Postman or Curl

**Health Check**:
```bash
curl -X GET http://localhost:5000/api/health
```

**Recommend Recipes**:
```bash
curl -X POST http://localhost:5000/api/recipes/recommend \
  -H "Content-Type: application/json" \
  -d '{"ingredients": ["garlic", "pasta", "chicken"]}'
```
