const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const stripe = require("stripe")("secret_key");
router.post("/", async (req, res) => {
  const { id, amount } = req.body;
  const payment = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    description: "Example Payment",
    payment_method: id,
    confirm: true,
  });
  console.log(payment);
  if (!payment) {
    return res.status(401).send("Payment not successful");
  }
  res.status(200).send("Payment successful");
});

module.exports = router;
