import { plans } from "../configs/plans.js";
import stripe from "../configs/stripe.js";
import TransactionModel from "../models/TransactionModel.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;

    const selectedPlan = plans.find((plan) => plan._id === planId);

    const transaction = await TransactionModel.create({
      userId,
      planId: selectedPlan._id,
      amount: selectedPlan.price,
      credits: selectedPlan.credits,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: selectedPlan.name,
              description: `${selectedPlan.credits} ChatBuddy Credits`,
            },

            // Stripe expects the smallest currency unit
            // USD -> cents
            unit_amount: selectedPlan.price * 100,
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/loading`,

      cancel_url: `${process.env.CLIENT_URL}/credits`,

      metadata: {
        transactionId: transaction._id.toString(),
        userId: userId.toString(),
        planId: selectedPlan._id,
        planName: selectedPlan.name,
      },
    });

    res.json({ success: true, checkoutUrl: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
