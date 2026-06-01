const recommendationService = require('../services/recommendationService');

/**
 * @desc    Get top recipe recommendations based on ingredients
 * @route   POST /api/recipes/recommend
 * @access  Public
 */
const recommendRecipes = (req, res, next) => {
  try {
    const { ingredients } = req.body;
    
    // Call the service layer to handle the business logic
    const topRecipes = recommendationService.getTopRecommendations(ingredients);

    res.status(200).json({
      success: true,
      recipes: topRecipes
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recommendRecipes
};
