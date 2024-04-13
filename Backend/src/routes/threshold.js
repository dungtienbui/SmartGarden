// import express from 'express';
// const router = express.Router();

// import gardenController from '../controllers/gardenController';

// router.get('/', gardenController.getAllGarden);

// export default router;

import express from 'express';
const router = express.Router();

import thresholdController from '../controllers/thresholdController';

//[Get] /value/:gardenId
router.get('/value/:gardenId', thresholdController.getThresholdValueByGardenId);

//[post] /update/light-intensive/:gardenId . post a object {upperValue, lowerValue}
router.post('/update/:sensorType/:gardenId', thresholdController.updateThresholdOfGarden)

export default router;

