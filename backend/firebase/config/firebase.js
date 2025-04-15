const admin = require('firebase-admin');
const serviceAccount = require('./skip-qu-firebase-adminsdk-fbsvc-23800b86b4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;