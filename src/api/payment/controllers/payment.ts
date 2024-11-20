/**
 * A set of functions called "actions" for `payment`
 */

import Stripe from "stripe";
import { Core } from "@strapi/strapi";

type PaymentControllers = Record<string, Core.ControllerHandler>;

const paymentControllers: PaymentControllers = {
  createIntentPayment: async (ctx) => {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET);
      const { amount } = ctx.request.body;
      const reqStripeCk = JSON.parse(ctx.cookies.get("stripe_pi") || "{}");

      let paymentIntent;

      console.log("reqStripeCk cookie", amount, reqStripeCk);
      if (!amount) throw new Error("Requirements not fulfilled");

      if (reqStripeCk.cs) {
        paymentIntent = await stripe.paymentIntents.update(reqStripeCk.id, {
          amount,
        });
      } else {
        paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      }

      console.log("stripe payment intent res", paymentIntent);

      const ck = {
        cs: paymentIntent.client_secret,
        id: paymentIntent.id,
        amount: amount,
      };

      ctx.cookies.set("stripe_cs", JSON.stringify(ck), {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
        // domain: "localhost",
      });

      ctx.body = paymentIntent;
      ctx.code = 200;
    } catch (err) {
      ctx.body = {
        error: "An error occurred while fetching data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500; // Set the HTTP status code to 500 to indicate a server error
    }
  },
};

export default paymentControllers;
