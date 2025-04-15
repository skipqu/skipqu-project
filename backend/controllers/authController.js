const admin = require('firebase-admin');
const USER_TYPES = require('../constants/userTypes');

const registerUser = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ message: 'Email, password, and userType are required.' });
  }

  if (!Object.values(USER_TYPES).includes(userType)) {
    return res.status(400).json({ message: 'Invalid userType provided.' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, { userType });

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
      email: userRecord.email,
      userType,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

module.exports = { registerUser };