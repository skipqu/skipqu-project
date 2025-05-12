const {getUidFromAuthHeader} = require('../firebase/config/middlewares/auth');
const {addCartItem: addCartItemService} = require('../services/cartService');

const addCartItem = async (req, res) => {
    try {
    const userId = await getUidFromAuthHeader(req.headers.authorization);
    const { supermarketId,pluId, versionId } = req.body;
    
    if (!userId || !pluId || !versionId) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const response = await addCartItemService(userId, supermarketId, pluId, versionId);

    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addCartItem };