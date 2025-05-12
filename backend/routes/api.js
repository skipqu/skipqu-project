const express = require('express');
const router = express.Router();
const { authorize } = require('../firebase/config/middlewares/auth');
const { registerUser } = require('../controllers/authController');
const userTypes = require('../constants/userTypes');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the public API!' });
});

router.post('/register', registerUser);

router.get('/secure', authorize(), (req, res) => {
  res.json({ message: `Welcome ${req.user.email || 'user'}, with role as ${req.user.userType || 'UserType'}!`, uid: req.user.uid });
});

// Example secure API with role check
router.post('/inventory', authorize(userTypes.ADMIN, userTypes.SUPERVISOR), (req, res) => {
  // Add inventory item logic here
  res.status(201).json({ message: 'Item added successfully (placeholder)' });
});

module.exports = router;