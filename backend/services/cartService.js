import pkg from 'firebase-admin';
const { firestore } = pkg;

const addCartItem = async (userId, supermarketId, pluId, versionId) => {
    const docId = `${pluId}$${versionId}`;
    const cartRef = firestore()
      .collection('cart')
      .doc(userId)
      .collection(supermarketId)
      .doc(docId);

    const docSnapshot = await cartRef.get();

    if (docSnapshot.exists) {
        return { message: 'Item is already added to the cart' };
    }

    await cartRef.set({ quantity: 1 }, { merge: true });
    return { message: 'Item added to cart successfully' };
};

const updateCartItemQuantity = async (userId, supermarketId, pluId, versionId, change) => {
    const docId = `${pluId}$${versionId}`;
    const cartRef = firestore()
      .collection('cart')
      .doc(userId)
      .collection(supermarketId)
      .doc(docId);

    const docSnapshot = await cartRef.get();

    if (!docSnapshot.exists) {
        return { message: 'Item not found in cart' };
    }

    const currentQuantity = docSnapshot.data().quantity || 0;
    const newQuantity = currentQuantity + change;

    if (newQuantity < 1) {
        await cartRef.delete();
        return { message: 'Item removed from cart' };
    }

    await cartRef.set({ quantity: newQuantity }, { merge: true });
    return { message: 'Cart item quantity updated', quantity: newQuantity };
};

const deleteCartItem = async (userId, supermarketId, pluId, versionId) => {
    const docId = `${pluId}$${versionId}`;
    const cartRef = firestore()
      .collection('cart')
      .doc(userId)
      .collection(supermarketId)
      .doc(docId);

    const docSnapshot = await cartRef.get();

    if (!docSnapshot.exists) {
        return { message: 'Item not found in cart' };
    }

    await cartRef.delete();
    return { message: 'Item removed from cart' };
};

const clearCart = async (userId) => {
  const cartRef = firestore().collection('cart').doc(userId);
  
  const supermarketCollections = await cartRef.listCollections();
  const batch = firestore().batch();

  for (const supermarketCollection of supermarketCollections) {
    const itemDocs = await supermarketCollection.listDocuments();
    itemDocs.forEach(doc => batch.delete(doc));
  }

  await batch.commit();
  return { message: 'Cart cleared successfully' };
};

const fetchCartItems = async (userId) => {
  const cartRef = firestore().collection('cart').doc(userId);
  const supermarkets = await cartRef.listCollections();

  const items = [];

  for (const supermarketCol of supermarkets) {
    const supermarketId = supermarketCol.id;
    const itemDocs = await supermarketCol.listDocuments();

    for (const itemDoc of itemDocs) {
      const itemSnap = await itemDoc.get();
      if (!itemSnap.exists) continue;

      const quantity = itemSnap.data().quantity || 0;
      const [pluId, versionId] = itemDoc.id.split('$');
      
      const inventoryRef = firestore()
        .collection('inventory')
        .doc(supermarketId)
        .collection(pluId)
        .doc(versionId);
      
      const inventorySnap = await inventoryRef.get();
      if (!inventorySnap.exists) continue;

      const itemData = inventorySnap.data();
      items.push({
        supermarketId,
        pluId,
        versionId,
        quantity,
        ...itemData
      });
    }
  }

  return items;
};

export default { addCartItem, updateCartItemQuantity, deleteCartItem, clearCart, fetchCartItems };