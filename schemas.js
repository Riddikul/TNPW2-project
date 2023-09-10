const Joi = require('joi');

module.exports.recipeSchema = Joi.object({
  recipe: Joi.object({
    title: Joi.string().required(),
    time: Joi.string().required(),
    ingredients: Joi.string().required(),
    recipe: Joi.string().required(),
    //price: Joi.number().min(5).required(),
  }).required(),
});
