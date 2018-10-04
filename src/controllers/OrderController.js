import 'dotenv';
import OrderModel from '../models/OrderModel';
import UserModel from '../models/UserModel';
import FoodModel from '../models/FoodModel';
import { isUUID } from '../utils/validator';

export class OrderController {
  makeOrder(request, response) {
    OrderModel.makeOrder(request.body).then((result) => {
        response.status(201).json({ status: 'success', message: 'Order placed', data: result });
      });
    
  }

  getOrderHistory(request, response) {
    if (!isUUID(request.params.userId)) {
      response.status(422).json({ status: 'error', message: 'Invalid user Id' });
    } else {
      OrderModel.getOrderHistory(request.params.userId).then(result => {
        if (result.length < 1)
          response.status(200).json({ status: 'success', data: [] });
        result.forEach(async (element, index, arr) => {
          let total = 0;
          let user = await UserModel.getUser(element.userid);
          element.name = (user[0]) ? user[0].name : 'No name';
          element.phone = (user[0]) ? user[0].phone : 'No phone';
          element.fooditems.forEach(async (item, ind, obj) => {
            await FoodModel.getFood(item.foodId).then(done => {
              item.name = done[0].name || 'Deleted', item.price = done[0].price || 'Deleted';
              item.subTotal = parseFloat(done[0].price * item.quantity).toFixed(2) || 'Deleted';
              total = parseFloat(parseInt(total) + parseInt(item.subTotal)).toFixed(2);
              if (arr.length - 1 === index && obj.length - 1 === ind) {
                element.totalPrice = total;
                response.status(200).json({ status: 'success', data: result });
              }
            });
            element.totalPrice = total;
          });
        });
      });
    }
  }

  getOrders(request, response) {
    OrderModel.getOrders().then(result => {
      if (result.length < 0)
          response.status(422).json({ status: 'success', data: [] });
      result.forEach(async (element, index, arr) => {
        let total = 0;
        let user = await UserModel.getUser(element.userid);
        element.name = (user[0]) ? user[0].name : 'No name';
        element.phone = (user[0]) ? user[0].phone : 'No phone';
        element.fooditems.forEach(async (item, ind, obj) => {
          await FoodModel.getFood(item.foodId).then(done => {
            item.name = done[0].name || 'Deleted', item.price = done[0].price || 'Deleted';
            item.subTotal = parseFloat(done[0].price * item.quantity).toFixed(2) || 'Deleted';
            total = parseFloat(parseInt(total) + parseInt(item.subTotal)).toFixed(2);
            if (arr.length - 1 === index && obj.length - 1 === ind) {
              element.totalPrice = total;
              response.status(200).json({ status: 'success', data: result });
            }
          });
          element.totalPrice = total;
        });
      });
    });
  }

  updateOrder(request, response) {
    if (['processing', 'cancelled', 'completed'].includes(request.body.status)) {
      OrderModel.updateOrder(request.params.orderId, request.body.status).then((result) => {
        if (result.length > 0) {
          response.status(200).json({ status: 'success', update: result[0] });
        } else {
          response.status(400).json({ status: 'error', message: 'invalid order ID' });
        }
      });
    } else {
      response.status(400).json({
        status: 'error',
        message: 'invalid status, please specify \"processing\", \"cancelled\", or \"completed\"'
      });
    }
  }

  getOrder(request, response) {
    OrderModel.getOrder(request.params.orderId).then((result) => {
      if (result.length === 1) {
        let total = 0;
        UserModel.getUser(result[0].userid).then(user => {
          result[0].name = (user[0]) ? user[0].name : 'No name';
          result[0].phone = (user[0]) ? user[0].phone : 'No phone';
          result[0].fooditems.forEach(async (item, ind, obj) => {
            await FoodModel.getFood(item.foodId).then(done => {
              item.name = done[0].name || 'Deleted', item.price = done[0].price || 'Deleted';
              item.subTotal = parseFloat(done[0].price * item.quantity).toFixed(2) || 'Deleted';
              total = parseFloat(parseInt(total) + parseInt(item.subTotal)).toFixed(2);
              if (obj.length - 1 === ind) {
                result[0].totalPrice = total;
                response.status(200).json({
                  status: 'success',
                  data: result[0]
                });
              }
            });
          });
        });
      } else {
        response.status(400).json({ status: 'error', message: 'invalid order ID' });
      }
    });
  }
}

export default new OrderController();
