import Joi from 'joi';

export const addPurchaseSchema = Joi.object({
  purchase_id: Joi.string().required(),
  supermarket_id: Joi.string().required(),
  total: Joi.number().required(),

  transaction_details: Joi.object({
    transaction_id: Joi.string().required(),
    payment_method: Joi.string().valid('UPI', 'CARD', 'CASH').required(),
    payment_status: Joi.string().valid('SUCCESS', 'FAILED', 'PENDING').required(),
    platform_fee: Joi.number().required()
  }).required(),

  anti_fraud_detection_technology: Joi.object({
    afd_risk_score: Joi.number().required(),
    security_check_needed: Joi.boolean().required(),
    verification_status: Joi.string().valid('VERIFIED', 'UNVERIFIED').required(),
    flagged_shopping: Joi.boolean().required()
  }).required(),

  items: Joi.array().items(
    Joi.object({
      pluId: Joi.string().required(),
      versionId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      offer: Joi.number().required(),
      description: Joi.string().required(),
      netWeight: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required()
});

// export const updatePurchaseSchema = Joi.object({
//   purchase_record_id: Joi.string().required(),
//   anti_fraud_detection_technology: Joi.object({
//     verification_status: Joi.string(),
//     flagged_shopping: Joi.boolean()
//   }).unknown(false),

//   transaction_details: Joi.object({
//     payment_status: Joi.string(),
//   }).unknown(false),
  
// }).or('verification_status', 'flagged_shopping', 'payment_status', 'purchase_record_id').unknown(false);



export const updatePurchaseSchema = Joi.object({
  anti_fraud_detection_technology: Joi.object({
    verification_status: Joi.string(),
    flagged_shopping: Joi.boolean()
  }).min(1).unknown(false),

  transaction_details: Joi.object({
    payment_status: Joi.string()
  }).min(1).unknown(false)
  })
  .custom((value, helpers) => {
    const hasVerificationStatus = value.anti_fraud_detection_technology?.verification_status !== undefined;
    const hasFlaggedShopping = value.anti_fraud_detection_technology?.flagged_shopping !== undefined;
    const hasPaymentStatus = value.transaction_details?.payment_status !== undefined;

    if (!hasVerificationStatus && !hasFlaggedShopping && !hasPaymentStatus) {
      return helpers.message('At least one of verification_status, flagged_shopping, or payment_status must be provided.');
    }

    return value;
  })
  .unknown(false);