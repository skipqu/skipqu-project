const admin = require('firebase-admin');

const addCartItem = async (userId, supermarketId, pluId, versionId) => {
    const docId = `${pluId}$${versionId}`;
    const cartRef = admin.firestore()
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
    const cartRef = admin.firestore()
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
    const cartRef = admin.firestore()
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

module.exports = { addCartItem, updateCartItemQuantity, deleteCartItem };