import Joi from "joi";

export const objectId = Joi.string().hex().length(24).required().messages({
  "string.base": "Chat ID must be a string",
  "string.hex": "Invalid Chat ID",
  "string.length": "Invalid Chat ID",
  "any.required": "Chat ID is required",
});

export const prompt = Joi.string().trim().min(1).max(4000).required().messages({
  "string.base": "Prompt must be a string",
  "string.empty": "Prompt cannot be empty",
  "string.min": "Prompt cannot be empty",
  "string.max": "Prompt cannot exceed 4000 characters",
  "any.required": "Prompt is required",
});
