const Joi = require('joi');

const base64Regex = /^(?:[A-Za-z0-9+/]{4}){2,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

const baggageSchema = Joi.object({
  brand: Joi.string().required(),
  category: Joi.string().required(),
  color: Joi.string().required(),
  images: Joi.array().items(Joi.string().pattern(base64Regex)).min(1).required(), // Validate array of base64 strings
});

module.exports = { baggageSchema };
