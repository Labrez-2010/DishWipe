const recipes = require('../data/recipes');

/**
 * Normalizes an ingredient name for better matching
 * @param {string} name
 * @returns {string}
 */
const normalizeIngredient = (name) => {
  return name.toLowerCase().trim();
};

const formatCookTime = (minutes) => `${minutes} min`;

const estimateCalories = (recipe) => {
  const base = recipe.ingredients.length * 45;
  const total = base + recipe.cookTime * 2;
  return `${total} kcal`;
};

const buildSteps = (recipe) => [
  `Gather your ingredients: ${recipe.ingredients.join(', ')}.`,
  'Prepare and chop ingredients as needed for even cooking.',
  recipe.description,
  `Cook for approximately ${recipe.cookTime} minutes, adjusting heat as needed.`,
  `Plate your ${recipe.title} and serve while fresh.`,
];

/**
 * Gets top 5 recipe recommendations based on user ingredients
 * @param {Array<string>} userIngredients
 * @returns {Array<Object>}
 */
const getTopRecommendations = (userIngredients) => {
  const normalizedUserIngs = userIngredients.map(normalizeIngredient);

  const scoredRecipes = recipes.map((recipe) => {
    let matchCount = 0;
    const ingredientsUsed = [];
    const missingIngredients = [];

    recipe.ingredients.forEach((recipeIng) => {
      const normalizedRecipeIng = normalizeIngredient(recipeIng);

      const isMatch = normalizedUserIngs.some(
        (userIng) =>
          normalizedRecipeIng.includes(userIng) || userIng.includes(normalizedRecipeIng)
      );

      if (isMatch) {
        matchCount++;
        ingredientsUsed.push(recipeIng);
      } else {
        missingIngredients.push(recipeIng);
      }
    });

    const totalIngredients = recipe.ingredients.length;
    const matchScore =
      totalIngredients > 0 ? Math.round((matchCount / totalIngredients) * 100) : 0;

    return {
      id: recipe.id,
      title: recipe.title,
      matchScore,
      matchPercentage: matchScore,
      cookTime: formatCookTime(recipe.cookTime),
      calories: estimateCalories(recipe),
      difficulty: recipe.difficulty,
      image: recipe.image,
      description: recipe.description,
      ingredientsUsed,
      missingIngredients,
      steps: buildSteps(recipe),
    };
  });

  scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

  return scoredRecipes.slice(0, 5);
};

module.exports = {
  getTopRecommendations,
};
