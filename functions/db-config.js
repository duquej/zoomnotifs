const admin = require("firebase-admin");
//import * as async from 'async'

const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zoomnotifs.firebaseio.com",
});

module.exports = {
  admin,
};
