const BaseJoi = require('joi-plus');
const sanitizeHTML = require('sanitize-html');
const { validate } = require('./models/user');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML' : '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHtml: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: [],
        })
        if(clean !== value) return helpers.error('string.escapeHTML', { value })
      }
    }
  }
})

const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required().escapeHtml(),
      price: Joi.number().required().min(0),
      // image: Joi.string().required(),
      location: Joi.string().required().escapeHtml(),
      description: Joi.string().required().escapeHtml(),
    }).required(),
    deleteImages: Joi.array()
  });

  module.exports.reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().required().min(0).max(5),
      body: Joi.string().required().escapeHtml(),
    }).required()
  })
