const express = require('express');
const { recommendRecipes } = require('../controllers/recipeController');
const { recommendRecipesValidator } = require('../validators/recipeValidator');
const { validate } = require('../middleware/validate');

const router = express.Router();

router.post('/recommend', recommendRecipesValidator, validate, recommendRecipes);

module.exports = router;
