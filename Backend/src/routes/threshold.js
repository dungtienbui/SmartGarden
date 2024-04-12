// import express from 'express';
// const router = express.Router();

// import gardenController from '../controllers/gardenController';

// router.get('/', gardenController.getAllGarden);

// export default router;

import express from 'express';
const router = express.Router();

import thresholdController from '../controllers/thresholdController';


router.get('/value', thresholdController.getThresholdValueByGardenId);
// router.post('/update/light-intensive', thresholdController.updateLightIntensiveThresholdOfGarden)

export default router;

