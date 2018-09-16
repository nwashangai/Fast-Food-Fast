import express from 'express';
import OrderController from '../controllers/OrderController';

const router = express.Router();

router.post('/orders', OrderController.setOrder);

module.exports = router;
