const cors = require("cors");
const express = require("express");
const errorMiddleware = require("../middleware/errorMiddleware");
const public = require("../routes/public");
const private = require("../routes/private");
const checkAuth = require("../middleware/mainMiddleware");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json({ limit: "50MB" }));
  app.use(errorMiddleware);
  app.use("/api", public);
  app.use("/api/private", checkAuth, private);
};
