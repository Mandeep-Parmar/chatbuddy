import express from "express";
import auth from "../middlewares/auth.js";
import {
  createCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";
import validate from "../middlewares/validate.js";
import { createCheckoutSessionSchema } from "../validations/paymentValidation.js";

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-sessions",
  auth,
  validate(createCheckoutSessionSchema),
  createCheckoutSession,
);

paymentRouter.post(
  "/webhook",
  // Instead of converting JSON,
  // Express keeps it exactly as Stripe sent it.
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

export default paymentRouter;
