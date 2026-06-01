const { validationResult } = require('express-validator');

/**
 * Middleware to catch express-validator errors and format them
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format error message to return only the first error for simplicity, or aggregate them
    const errorMsg = errors.array().map(err => err.msg).join(', ');
    return res.status(400).json({
      success: false,
      message: `Validation failed: ${errorMsg}`
    });
  }
  next();
};

module.exports = {
  validate
};
