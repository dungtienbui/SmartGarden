import express from 'express';
const router = express.Router();

import sensorController from '../controllers/sensorController';

router.get('/info', sensorController.getAllSensor);
router.get('/:sensorId', sensorController.getLastSavedValue);
router.get('/info/:sensorId', sensorController.getSensorInfo);

export default router;
