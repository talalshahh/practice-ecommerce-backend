const express = require("express");
const userRoutes = require("../routes/private/user");
const cartRoutes = require("../routes/private/cart");
const paymentRoutes = require("../routes/private/payment");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
