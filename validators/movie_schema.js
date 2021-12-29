const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().alphanum().min(10).max(30).required(),

  year: Joi.number().integer().greater(1900).less(2022).required(),

  format: Joi.string().valid("VHS", "DVD", "Blu-Ray"),
});

module.exports = schema;
