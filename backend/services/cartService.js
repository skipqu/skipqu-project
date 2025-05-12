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

module.exports = { addCartItem};