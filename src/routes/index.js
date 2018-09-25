import express from 'express';
import auth from '../middlewares/auth';
import validator from '../middlewares/validator';
import OrderController from '../controllers/OrderController';
import UserController from '../controllers/UserController';
import FoodController from '../controllers/FoodController';

const router = express.Router();

router.post('/auth/signup', validator, UserController.signUp);
router.post('/auth/login', validator, UserController.login);
router.post('/orders', auth, validator, OrderController.makeOrder);
router.post('/menu', auth, validator, FoodController.addFood);
router.get('/menu', auth, FoodController.getFoodMenu);
router.get('/users/:userId/orders', auth, OrderController.getOrderHistory);
router.get('/orders', OrderController.getOrders);
router.get('/orders/:orderId', auth, validator, OrderController.getOrder);
router.put('/orders/:orderId', auth, validator, OrderController.updateOrder);

export default router;
