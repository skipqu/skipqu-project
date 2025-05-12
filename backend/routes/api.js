const express = require('express');
const router = express.Router();
const { authorize } = require('../firebase/config/middlewares/auth');
const { registerUser } = require('../controllers/authController');
const userTypes = require('../constants/userTypes');
const { addInventoryItem, fetchInventoryItem, updateInventoryItem } = require('../controllers/inventoryController');
const { addCartItem, updateCartItemQuantity } = require('../controllers/cartController');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the public API!' });
});

router.post('/register', registerUser);

router.get('/secure', authorize(), (req, res) => {
  res.json({ message: `Welcome ${req.user.email || 'user'}, with role as ${req.user.userType || 'UserType'}!`, uid: req.user.uid });
});

// Add inventory item route
router.post('/add-inventory-item', authorize(userTypes.ADMIN, userTypes.SUPERVISOR), addInventoryItem, (req, res) => {
  res.status(201).json({ message: 'Item added successfully.' });
});

// Get inventory items for given supermarketId and pluId
router.get('/fetch-inventory-item/:supermarketId/:pluId', authorize(), fetchInventoryItem, async (req, res) => {});

// Update inventory item for given supermarketId, pluId, and versionId
router.put('/update-inventory-item/:supermarketId/:pluId/:versionId', authorize(userTypes.ADMIN, userTypes.SUPERVISOR), updateInventoryItem, (req, res) => {
  res.status(200).json({ message: 'Item updated successfully.' });
});

// Add cart item route
router.post('/add-cart-item', authorize(userTypes.BUYER), addCartItem, (req, res) => {
  res.status(201).json({ message: 'Item added successfully.' });
});

// Increment or decrement cart item quantity
router.put('/update-cart-item-quantity', authorize(userTypes.BUYER), updateCartItemQuantity, async (req, res) => {
  res.status(200).json({ message: 'Item quantity updated successfully.' });
});


module.exports = router;