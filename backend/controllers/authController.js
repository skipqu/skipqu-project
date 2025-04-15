const { createUserWithRole } = require('../services/authService');
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
    const result = await createUserWithRole(email, password, userType);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

module.exports = { registerUser };