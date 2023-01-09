var admin = require("firebase-admin");

var serviceAccount = require("../credentials/FirebaseCred.json");

const mainAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  mainAdmin,
};
