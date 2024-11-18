export default {
  routes: [
    {
      method: "POST",
      path: "/payment",
      handler: "payment.stripeIntentPayment",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
