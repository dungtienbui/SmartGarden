import express from 'express';
const router = express.Router();

import thresholdController from '../controllers/thresholdController';

//[Get] /value/:gardenId
router.get('/value/:gardenId', thresholdController.getThresholdValueByGardenId);

//[post] /update/light-intensive/:gardenId . post a object {upperValue, lowerValue}
router.post('/update/:sensorId/:gardenId', thresholdController.updateThresholdOfGarden)

export default router;

