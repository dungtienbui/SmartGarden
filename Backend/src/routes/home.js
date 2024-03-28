import express from 'express';
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.getAllValue);

module.exports = router;
