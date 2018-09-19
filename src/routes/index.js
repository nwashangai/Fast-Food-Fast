import express from 'express';
import OrderController from '../controllers/OrderController';

const router = express.Router();

router.post('/orders', OrderController.makeOrder);
router.get('/orders', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOrders);
router.put('/orders/:id', OrderController.updateOrder);

export default router;
