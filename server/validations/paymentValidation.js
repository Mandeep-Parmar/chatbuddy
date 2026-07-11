import Joi from "joi";

export const createCheckoutSessionSchema = Joi.object({
  planId: Joi.string()
    .trim()
    .valid("basic", "pro", "premium")
    .required()
    .messages({
      "string.base": "Plan ID must be a string",
      "string.empty": "Plan ID is required",
      "any.only": "Invalid plan selected",
      "any.required": "Plan ID is required",
    }),
});
