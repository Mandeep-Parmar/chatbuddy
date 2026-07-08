import Joi from "joi";
import { objectId } from "./commonValidation.js";

export const textMessageSchema = Joi.object({
  chatId: objectId,

  prompt: Joi.string().trim().min(1).max(4000).required().messages({
    "string.base": "Prompt must be a string",
    "string.empty": "Prompt cannot be empty",
    "string.min": "Prompt cannot be empty",
    "string.max": "Prompt cannot exceed 4000 characters",
    "any.required": "Prompt is required",
  }),
});
