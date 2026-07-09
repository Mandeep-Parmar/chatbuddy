import Joi from "joi";
import { objectId, prompt } from "./commonValidation.js";

export const textMessageSchema = Joi.object({
  chatId: objectId,

  prompt,
});

export const imageMessageSchema = Joi.object({
  chatId: objectId,

  prompt,

  isPublished: Joi.boolean().required().messages({
    "boolean.base": "isPublished must be true or false",
    "any.required": "isPublished is required",
  }),
});
