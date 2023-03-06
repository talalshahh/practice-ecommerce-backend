const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51MgoGPBEmKccR1EIj9YARNWXh3PBt5eNZPUHpjZf0tte4tmT0iyG3rLiPjlbd7Lu7L1VuQiHa4fuMJZEGZxUCb7F00NwuTxP6j"
);
router.get("/secret", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.status(200).send({ client_secret: paymentIntent.client_secret });
});

module.exports = router;
