const { body } = require('express-validator');

const recommendRecipesValidator = [
  body('ingredients')
    .exists({ checkFalsy: true }).withMessage('Ingredients are required')
    .isArray().withMessage('Ingredients must be an array')
    .isArray({ min: 1 }).withMessage('Minimum 1 ingredient required')
    .isArray({ max: 30 }).withMessage('Maximum 30 ingredients allowed'),
  body('ingredients.*')
    .isString().withMessage('Each ingredient must be a string')
    .trim()
    .escape()
];

module.exports = {
  recommendRecipesValidator
};
