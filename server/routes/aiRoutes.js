import express from "express";
import auth from "../middlewares/auth.js";
import {
  imageMessageController,
  textMessageController,
} from "../controllers/aiController.js";
import validate from "../middlewares/validate.js";
import {
  imageMessageSchema,
  textMessageSchema,
} from "../validations/aiValidation.js";

const aiRouter = express.Router();

aiRouter.post(
  "/text",
  auth,
  validate(textMessageSchema),
  textMessageController,
);

aiRouter.post(
  "/image",
  auth,
  validate(imageMessageSchema),
  imageMessageController,
);

export default aiRouter;
