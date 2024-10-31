/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import { error } from "console";
import { Stripe } from "stripe";
export default factories.createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    const { products } = ctx.request.body;
    console.log("req products", products);
    const productService = strapi.service("api::product.product");
    const orderService = strapi.service("api::order.order");

    try {
      const lineitems = await Promise.all(
        products.map(async function (product) {
          const item = await productService.findOne(product.documentId);
          // console.log("item product service", item.productName);
          // const stripeProduct = await stripe.products.create({
          //   name: item?.productName as string,
          //   default_price_data: {
          //     currency: "USD",
          //     unit_amount: Math.round(item.price * 100),
          //   },
          //   type: "good",
          // });

          // console.log("stripe product", stripeProduct);

          return {
            price_data: {
              product_data: {
                name: item?.productName as string,
              },
              currency: "USD",
              unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
          };
        })
      );

      console.log(lineitems);

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["US", "HN"],
        },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "/success?e=true",
        line_items: lineitems,
      });

      await orderService.create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (e) {
      ctx.response.status = 500;
      console.error("stripe controller", e);
      return { error };
    }
  },
}));
