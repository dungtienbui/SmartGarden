import express from 'express';
const router = express.Router();

import deviceController from '../controllers/deviceController';

router.post('/', deviceController.postDeviceCondition);
router.get('/data', deviceController.getDeviceCondition);
router.get('/data/page/:deviceId', deviceController.getPageOperationData);

router.post('/appliedTh', deviceController.postDeviceAppliedTh);
router.get('/appliedTh/data', deviceController.getDeviceAppliedTh);

export default router;