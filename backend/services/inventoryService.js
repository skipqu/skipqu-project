import pkg from 'firebase-admin';
const { firestore } = pkg;

const addInventoryItem = async (supermarketId, pluId, name, price, offer, description, netWeight, in_stock) => {
    const inventoryRef = firestore()
      .collection('inventory')
      .doc(supermarketId)
      .collection(pluId);

    const newVersionRef = await inventoryRef.add({
        name,
        price,
        offer: offer || 0,
        description: description || '',
        netWeight: netWeight || '',
        in_stock: in_stock || 0,
        createdAt: firestore.FieldValue.serverTimestamp()
    });

    return newVersionRef;
};

const fetchInventoryItem = async (supermarketId, pluId) => {
    const versionsSnapshot = await firestore()
      .collection('inventory')
      .doc(supermarketId)
      .collection(pluId)
      .get();

    const items = versionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return items;
};

const updateInventoryItem = async (supermarketId, pluId, versionId, name, price, offer, description, netWeight, in_stock) => {
  const docRef = firestore()
    .collection('inventory')
    .doc(supermarketId)
    .collection(pluId)
    .doc(versionId);

  const docSnapshot = await docRef.get();
  if (!docSnapshot.exists) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }

  const updatedData = {
    ...(name && { name }),
    ...(price !== undefined && { price }),
    ...(offer !== undefined && { offer }),
    ...(description && { description }),
    ...(netWeight && { netWeight }),
    ...(in_stock !== undefined && { in_stock })
  };

  await docRef.update(updatedData);
};

export default { addInventoryItem, fetchInventoryItem, updateInventoryItem };