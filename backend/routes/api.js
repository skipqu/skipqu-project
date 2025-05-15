import { Router } from 'express';
const router = Router();
import { authorize } from '../firebase/config/middlewares/auth.js';
import { registerUser } from '../controllers/authController.js';
// import { ADMIN, SUPERVISOR, BUYER } from '../constants/userTypes.js';
import { addInventoryItem, fetchInventoryItem, updateInventoryItem } from '../controllers/inventoryController.js';
import { addCartItem, updateCartItemQuantity, deleteCartItem, clearCart, fetchCartItems } from '../controllers/cartController.js';
import { addPurchaseRecord, updatePurchaseRecord } from '../controllers/purchaseController.js';
import userTypes from '../constants/userTypes.js';

const { ADMIN, SUPERVISOR, BUYER } = userTypes;

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the public API!' });
});

router.post('/register', registerUser);

router.get('/secure', authorize(), (req, res) => {
  res.json({ message: `Welcome ${req.user.email || 'user'}, with role as ${req.user.userType || 'UserType'}!`, uid: req.user.uid });
});

// Add inventory item route
router.post('/inventory/add-inventory-item', authorize(ADMIN, SUPERVISOR), addInventoryItem, (req, res) => {
  res.status(201).json({ message: 'Item added successfully.' });
});

// Get inventory items for given supermarketId and pluId
router.get('/inventory/fetch-inventory-item/:supermarketId/:pluId', authorize(), fetchInventoryItem, async (req, res) => {});

// Update inventory item for given supermarketId, pluId, and versionId
router.put('/update-inventory-item/:supermarketId/:pluId/:versionId', authorize(ADMIN, SUPERVISOR), updateInventoryItem, (req, res) => {
  res.status(200).json({ message: 'Item updated successfully.' });
});

// Add cart item route
router.post('/cart/add-cart-item', authorize(BUYER), addCartItem, (req, res) => {
  res.status(201).json({ message: 'Item added successfully.' });
});

// Increment or decrement cart item quantity
router.put('/cart/update-cart-item-quantity', authorize(BUYER), updateCartItemQuantity, async (req, res) => {
  res.status(200).json({ message: 'Item quantity updated successfully.' });
});

// Remove cart item route
router.delete('/cart/remove-cart-item', authorize(BUYER), deleteCartItem, async (req, res) => {
  res.status(200).json({ message: 'Item deleted successfully.' });
});

// Clear Cart Items
router.delete('/cart/clear-cart-items', authorize(), clearCart, async (req, res) => {
  res.status(200).json({ message: 'Cart cleared successfully.' });
});

// Fetch Cart Items
router.get('/cart/fetch-cart-items', authorize(BUYER), fetchCartItems, async (req, res) => {});

// Add Purchase record
router.post('/purchase/add-purchase-record', authorize(BUYER), addPurchaseRecord, async (req, res) => {});

// Update Purchase record
router.put('/purchase/update-purchase-record/:purchaseRecordId', authorize(), updatePurchaseRecord, async (req, res) => {});

export default router;