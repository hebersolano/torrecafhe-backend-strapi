import { config } from "process";

export default {
  routes: [
    {
      method: "POST",
      path: "/payment",
      handler: "payment.createIntentPayment",
      config: {
        policies: [],
        middlewares: [
          {
            name: "strapi::cors",
            config: {
              origin: "http://localhost:3000",
              credentials: true,
              methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
              headers: ["Content-Type", "Authorization", "Origin", "Accept"],
              keepHeaderOnError: true,
            },
          },
        ],
      },
    },
  ],
};
