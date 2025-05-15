import {getUidFromAuthHeader} from '../firebase/config/middlewares/auth.js';
import cartService from '../services/cartService.js';

const {addCartItem: addCartItemService, 
    updateCartItemQuantity: updateCartItemQuantityService,
    deleteCartItem: deleteCartItemService,
    clearCart: clearCartService,
    fetchCartItems: fetchCartItemsService
} = cartService;

export const addCartItem = async (req, res) => {
    try {
    const userId = await getUidFromAuthHeader(req.headers.authorization);
    const { supermarketId,pluId, versionId } = req.body;
    
    if (!userId || !supermarketId || !pluId || !versionId) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const response = await addCartItemService(userId, supermarketId, pluId, versionId);

    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCartItemQuantity = async (req, res) => {
    const userId = await getUidFromAuthHeader(req.headers.authorization);
    const { supermarketId, pluId, versionId, change } = req.body;

  if (!userId || !supermarketId || !pluId || !versionId || !Number.isInteger(change)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }
  try {
    const response = await updateCartItemQuantityService(userId, supermarketId, pluId, versionId, change);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const userId = await getUidFromAuthHeader(req.headers.authorization);
    const { supermarketId, pluId, versionId } = req.body;

    if (!userId || !supermarketId || !pluId || !versionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await deleteCartItemService(userId, supermarketId, pluId, versionId);

    res.status(200).json(response);

  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = await getUidFromAuthHeader(req.headers.authorization);

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const response = await clearCartService(userId);

    res.status(200).json(response);
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const userId = await getUidFromAuthHeader(req.headers.authorization);

    if (!userId) {
      return res.status(400).json({ error: 'User ID and supermarket ID are required' });
    }

    const cartItems = await fetchCartItemsService(userId);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}