import express from 'express';
import OrderController from '../controllers/OrderController';

const router = express.Router();

router.post('/orders', OrderController.setOrder);
router.get('/orders', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOrders);

module.exports = router;
