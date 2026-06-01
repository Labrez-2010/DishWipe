const recipes = require('../data/recipes');

/**
 * Normalizes an ingredient name for better matching
 * @param {string} name 
 * @returns {string}
 */
const normalizeIngredient = (name) => {
  return name.toLowerCase().trim();
};

/**
 * Gets top 5 recipe recommendations based on user ingredients
 * @param {Array<string>} userIngredients 
 * @returns {Array<Object>}
 */
const getTopRecommendations = (userIngredients) => {
  const normalizedUserIngs = userIngredients.map(normalizeIngredient);

  const scoredRecipes = recipes.map(recipe => {
    let matchCount = 0;
    const ingredientsUsed = [];
    const missingIngredients = [];

    // Check each recipe ingredient against user ingredients
    recipe.ingredients.forEach(recipeIng => {
      const normalizedRecipeIng = normalizeIngredient(recipeIng);
      
      // Simple partial match logic (e.g. user="tomato", recipe="diced tomatoes")
      const isMatch = normalizedUserIngs.some(userIng => 
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
    // Calculate percentage, maxing at 100
    const matchScore = totalIngredients > 0 ? Math.round((matchCount / totalIngredients) * 100) : 0;

    return {
      id: recipe.id,
      title: recipe.title,
      matchScore,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      image: recipe.image,
      description: recipe.description,
      ingredientsUsed,
      missingIngredients
    };
  });

  // Rank by highest match score
  scoredRecipes.sort((a, b) => b.matchScore - a.matchScore);

  // Return top 5
  return scoredRecipes.slice(0, 5);
};

module.exports = {
  getTopRecommendations
};
