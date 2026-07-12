import { plans } from "../configs/plans.js";
import stripe from "../configs/stripe.js";
import TransactionModel from "../models/TransactionModel.js";
import UserModel from "../models/UserModel.js";

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

export const stripeWebhook = async (req, res) => {
  try {
    // Stripe sends a unique signature with every webhook request.
    // We use it to verify that the request actually came from Stripe.
    const signature = req.headers["stripe-signature"];

    // Verify the webhook event using the request body,
    // Stripe signature, and your webhook secret.
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Webhook Event:", event.type);

    // Handle the event only when the payment is completed successfully.
    if (event.type === "checkout.session.completed") {
      // Checkout session created by Stripe after successful payment.
      const session = event.data.object;

      // Retrieve the metadata that we attached while creating
      // the Stripe Checkout Session.
      const { transactionId, userId } = session.metadata;

      // Find the transaction stored in our database.
      const transaction = await TransactionModel.findById(transactionId);

      // If the transaction doesn't exist or has already been processed,
      // return immediately to avoid duplicate credit additions.
      if (!transaction || transaction.status === "paid") {
        return res.status(200).json({
          received: true,
        });
      }

      // Mark the transaction as paid.
      transaction.status = "paid";

      await transaction.save();

      // Add the purchased credits to the user's account.
      await UserModel.findByIdAndUpdate(userId, {
        $inc: {
          credits: transaction.credits,
        },
      });
    }

    // Inform Stripe that the webhook was received successfully.
    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
