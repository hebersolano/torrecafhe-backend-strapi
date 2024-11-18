/**
 * A set of functions called "actions" for `payment`
 */

import Stripe from "stripe";

export default {
  stripeIntentPayment: async (ctx, next) => {
    try {
      console.log(ctx.request.body);
      // const stripe = new Stripe(process.env.STRIPE_SECRET);
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: 2000,
      //   currency: "usd",
      //   automatic_payment_methods: {
      //     enabled: true,
      //   },
      // });

      // ctx.body = { paymentIntent: paymentIntent.id };
    } catch (err) {
      ctx.body = {
        error: "An error occurred while fetching data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500; // Set the HTTP status code to 500 to indicate a server error
    }
  },
};
