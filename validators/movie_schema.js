const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(3).max(30).required(),

  year: Joi.number().integer().greater(1950).less(2022).required(),

  format: Joi.string().valid("VHS", "DVD", "Blu-Ray"),
});

module.exports = schema;
