import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

router.post('/check', userController.checkUser);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

export default router;
