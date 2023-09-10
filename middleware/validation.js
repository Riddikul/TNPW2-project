const { recipeSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

module.exports.validateRecipe = (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(', ');
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};
