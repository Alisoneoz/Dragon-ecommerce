const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.cartItems)
  const line_items = req.body.cartItems.map((item) => {
    return {
      quantity: item.amount,
      price_data: {
        currency: "usd",
        unit_amount: item.price*100,
        product_data: {
          name: item.title,
          images: [item.image],
          metadata:{
            id:item.id
          }
        },
      },
      
    };
  });

  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
  
      shipping_address_collection: { allowed_countries: ["AR", "VE", "CA", "US", "BR"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
    line_items,
    phone_number_collection:{
      enabled:true,
    },
    mode: "payment",
    success_url: "https://dragon-ecommerce-store.netlify.app/",
    cancel_url: "https://dragon-ecommerce-store.netlify.app/cart",
  });

  res.send({ url: session.url });
});

module.exports = router;
