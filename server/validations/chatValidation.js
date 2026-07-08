import Joi from "joi";
import { objectId } from "./commonValidation.js";

export const deleteChatSchema = Joi.object({
  chatId: objectId,
});
