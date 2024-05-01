import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

router.post('/login', userController.login);
router.put('/logout', userController.logout);
router.get('/username', userController.getUserNames);

export default router;
