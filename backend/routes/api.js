const express = require('express');
const router = express.Router();
const authenticate = require('../firebase/config/middlewares/auth');
const { registerUser } = require('../controllers/authController');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the public API!' });
});

router.post('/register', registerUser);

router.get('/secure', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name || 'user'}!`, uid: req.user.uid });
});

module.exports = router;