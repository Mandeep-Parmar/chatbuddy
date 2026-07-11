import express from "express";
import auth from "../middlewares/auth.js";
import { createCheckoutSession } from "../controllers/paymentController.js";
import validate from "../middlewares/validate.js";
import { createCheckoutSessionSchema } from "../validations/paymentValidation.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-sessions",
  auth,
  validate(createCheckoutSessionSchema),
  createCheckoutSession,
);

export default paymentRouter;
