const express = require("express");
const userRoutes = require("../routes/admin/admin");
const router = express.Router();

router.use("/admin", userRoutes);

module.exports = router;
