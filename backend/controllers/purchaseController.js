import {getUidFromAuthHeader} from '../firebase/config/middlewares/auth.js';
import purchaseService from '../services/purchaseService.js';
import { addPurchaseSchema, updatePurchaseSchema } from '../constants/validations/purchaseValidations.js';

const { addPurchaseRecord: addPurchaseRecordService, updatePurchaseRecord: updatePurchaseRecordService } = purchaseService;

export const addPurchaseRecord = async (req, res) => {
    try {
        const userId = await getUidFromAuthHeader(req.headers.authorization);
        const payload = req.body;

        const { error } = addPurchaseSchema.validate(payload);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const result = await addPurchaseRecordService(payload, userId);

        return res.status(201).json(result);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePurchaseRecord = async (req, res) => {
    try {
        const userId = await getUidFromAuthHeader(req.headers.authorization);
        const payload = req.body;
        const { purchaseRecordId } = req.params;

        const { error } = updatePurchaseSchema.validate(payload);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await updatePurchaseRecordService(payload, purchaseRecordId, userId);

        return res.status(201).json(result);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}