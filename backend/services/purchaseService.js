import admin from 'firebase-admin';

const addPurchaseRecord = async (
  payload, userId
) => {
  const purchaseRef = admin
    .firestore()
    .collection('purchase_history')
    .doc(userId)
    .collection('records')
    .doc(); // auto-generated ID

  const itemsRef = purchaseRef.collection('items');

  const batch = admin.firestore().batch();
  const skipquId = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit SkipQu ID

  batch.set(purchaseRef, {
    skipqu_id: skipquId,
    datetime: admin.firestore.FieldValue.serverTimestamp(),
    purchase_id: payload.purchase_id,
    supermarket_id: payload.supermarket_id,
    total: payload.total,
    transaction_details: {
      transaction_id: payload.transaction_details.transaction_id,
      payment_method: payload.transaction_details.payment_method,
      payment_status: payload.transaction_details.payment_status,
      platform_fee: payload.transaction_details.platform_fee,
    },
    anti_fraud_detection_technology: {
      afd_risk_score: payload.anti_fraud_detection_technology.afd_risk_score,
      security_check_needed: payload.anti_fraud_detection_technology.security_check_needed,
      verification_status: payload.anti_fraud_detection_technology.verification_status,
      flagged_shopping: payload.anti_fraud_detection_technology.flagged_shopping,
    },
  });

  payload.items.forEach(item => {
    const itemDoc = itemsRef.doc(); // auto-generated
    batch.set(itemDoc, {
      pluId: item.pluId,
      versionId: item.versionId,
      name: item.name,
      price: item.price,
      offer: item.offer,
      description: item.description,
      netWeight: item.netWeight,
      quantity: item.quantity || 1, // default to 1 if not provided
    });
  });

  await batch.commit();
  return { message: 'Purchase recorded successfully' };
};

const updatePurchaseRecord = async (payload, purchaseRecordId, userId) => {
  const purchaseRef = admin
    .firestore()
    .collection('purchase_history')
    .doc(userId)
    .collection('records')
    .doc(purchaseRecordId);

  await purchaseRef.update(payload);

  return { message: 'Purchase record updated successfully' };
};

export default { addPurchaseRecord, updatePurchaseRecord };