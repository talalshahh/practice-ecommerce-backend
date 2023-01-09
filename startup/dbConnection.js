const mongoose = require("mongoose");

module.exports = function () {
  const uri = process.env.DB_URI;
  const dbName = process.env.DB_NAME;

  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log("Connection to database is sucessfully", dbName);
    })
    .catch((err) => {
      console.log("Connection to database is failed");
    });
};
