import express from 'express';
const router = express.Router();

import settingController from '../controllers/settingController';

router.get('/notification', settingController.sendNotification);

export default router;
