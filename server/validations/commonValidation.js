import Joi from "joi";

export const objectId = Joi.string().hex().length(24).required().messages({
  "string.base": "Chat ID must be a string",
  "string.hex": "Invalid Chat ID",
  "string.length": "Invalid Chat ID",
  "any.required": "Chat ID is required",
});
