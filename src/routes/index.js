import express from 'express';
import auth from '../middlewares/auth';
import validator from '../middlewares/validator';
import OrderController from '../controllers/OrderController';
import UserController from '../controllers/UserController';
import FoodController from '../controllers/FoodController';

const router = express.Router();

router.post('/auth/signup', validator.signUp, UserController.signUp);
router.post('/auth/login', validator.login, UserController.login);
router.post('/orders', auth, validator.foodItems, OrderController.makeOrder);
router.post('/menu', auth, validator.menu, FoodController.addFood);
router.get('/menu', auth, FoodController.getFoodMenu);
router.put('/menu/:menuId', auth, validator.menu, FoodController.updateFoodMenu);
router.delete('/menu/:menuId', auth, validator.deleteMenu, FoodController.deleteFood);
router.get('/users/:userId/orders', auth, OrderController.getOrderHistory);
router.get('/orders', auth, validator.getOrders, OrderController.getOrders);
router.get('/user', auth, UserController.getUser);
router.get('/orders/:orderId', auth, validator.order, OrderController.getOrder);
router.put('/orders/:orderId', auth, validator.order, OrderController.updateOrder);

export default router;
