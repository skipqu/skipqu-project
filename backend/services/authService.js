const admin = require('firebase-admin');

const createUserWithRole = async (email, password, userType) => {
  const userRecord = await admin.auth().createUser({ email, password });
  await admin.auth().setCustomUserClaims(userRecord.uid, { userType });

  return {
    message: 'User registered successfully',
    uid: userRecord.uid,
    email: userRecord.email,
    userType,
  };
};

module.exports = { createUserWithRole };