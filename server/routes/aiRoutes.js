import express from "express";
import auth from "../middlewares/auth.js";
import { textMessageController } from "../controllers/aiController.js";
import validate from "../middlewares/validate.js";
import { textMessageSchema } from "../validations/aiValidation.js";

const aiRouter = express.Router();

aiRouter.post(
  "/text",
  auth,
  validate(textMessageSchema),
  textMessageController,
);

export default aiRouter;
