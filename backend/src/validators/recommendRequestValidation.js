/**
 * Shared validation for Express routes and Vercel serverless handlers.
 * @param {object} body
 * @returns {string|null} Error message or null when valid
 */
const validateRecommendRequest = (body) => {
  if (!body || typeof body !== 'object') {
    return 'Ingredients are required';
  }

  const { ingredients } = body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return 'Minimum 1 ingredient required';
  }

  if (ingredients.length > 30) {
    return 'Maximum 30 ingredients allowed';
  }

  for (const ingredient of ingredients) {
    if (typeof ingredient !== 'string' || !ingredient.trim()) {
      return 'Each ingredient must be a string';
    }
  }

  return null;
};

module.exports = {
  validateRecommendRequest,
};
