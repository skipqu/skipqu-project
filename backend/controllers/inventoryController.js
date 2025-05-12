const { addInventoryItem: addInventoryItemService, 
    fetchInventoryItem: fetchInventoryItemService,
    updateInventoryItem: updateInventoryItemService
} = require('../services/inventoryService');

const addInventoryItem = async (req, res) => {
    try {
    const { supermarketId, pluId, name, price, offer, description, netWeight, in_stock } = req.body;

    if (!supermarketId || !pluId || !name || price == null) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const newVersionRef = await addInventoryItemService(supermarketId, pluId, name, price, offer, description, netWeight, in_stock);

    return res.status(201).json({
      message: 'Inventory item added',
      versionId: newVersionRef.id
    });

  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchInventoryItem = async (req, res) => {
  const { supermarketId, pluId } = req.params;

  try {
    const items = await fetchInventoryItemService(supermarketId, pluId);

    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

const updateInventoryItem = async (req, res, next) => {
  try {
    const { supermarketId, pluId, versionId } = req.params;
    const { name, price, offer, description, netWeight, in_stock } = req.body;

    await updateInventoryItemService(supermarketId, pluId, versionId, name, price, offer, description, netWeight, in_stock);
    res.status(200).json({ message: 'Inventory item updated successfully' });

    next(); // Pass control to the final response middleware
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

module.exports = { addInventoryItem, fetchInventoryItem, updateInventoryItem};