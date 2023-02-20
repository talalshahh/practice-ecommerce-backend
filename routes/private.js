const express = require("express");
const userRoutes = require("../routes/private/user");
const cartRoutes = require("../routes/private/cart");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
