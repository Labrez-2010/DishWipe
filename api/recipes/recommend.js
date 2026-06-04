const recommendationService = require('../../backend/src/services/recommendationService');
const { validateRecommendRequest } = require('../../backend/src/validators/recommendRequestValidation');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const validationError = validateRecommendRequest(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: `Validation failed: ${validationError}`,
      });
    }

    const { ingredients } = req.body;
    const topRecipes = recommendationService.getTopRecommendations(ingredients);

    return res.status(200).json({
      success: true,
      recipes: topRecipes,
    });
  } catch (error) {
    console.error('Recipe recommendation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
