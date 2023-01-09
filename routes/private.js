const express = require("express");
const userRoutes = require("../routes/private/user");
const router = express.Router();

router.use("/user", userRoutes);

module.exports = router;
