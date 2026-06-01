/**
 * @desc    Get health status of the API
 * @route   GET /api/health
 * @access  Public
 */
const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "DishWipe API running"
  });
};

module.exports = {
  getHealth
};
