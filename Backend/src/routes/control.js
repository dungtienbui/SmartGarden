import express from 'express';
const router = express.Router();

import controlController from '../controllers/controlController';

router.get('/device/data', controlController.getDeviceCondition);
router.post('/device', controlController.postDeviceCondition);

export default router;