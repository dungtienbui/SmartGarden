import express from 'express';
const router = express.Router();

import controlController from '../controllers/controlController';

router.post('/device', controlController.postDeviceCondition);
router.get('/device/data', controlController.getDeviceCondition);

router.post('/appliedTh', controlController.postDeviceAppliedTh);
router.get('/appliedTh/data', controlController.getDeviceAppliedTh);

export default router;