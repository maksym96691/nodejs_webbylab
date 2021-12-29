const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(20).max(3).required(),

  lastName: Joi.string().alphanum().min(20).max(3).required(),
});

module.exports = schema;
