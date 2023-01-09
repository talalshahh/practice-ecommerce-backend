require("dotenv").config();
const express = require("express");
const dbConnection = require("./startup/dbConnection");

dbConnection();
const app = express();
const server = require("http").createServer(app);
require("./startup/prod")(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server running successfully at:" + port);
});
