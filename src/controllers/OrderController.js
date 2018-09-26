import 'dotenv';
import OrderModel from '../models/OrderModel';
import { order } from '../models/store';
import { isUUID } from '../utils/validator';

export class OrderController {
  makeOrder(request, response) {
    OrderModel.makeOrder(request.body).then((result) => {
        response.status(200).json({ status: 'success', message: 'Order placed', data: result });
      });
    
  }

  getOrderHistory(request, response) {
    if (!isUUID(request.params.userId)) {
      response.status(422).json({ status: 'error', message: 'Invalid user Id' });
    } else {
      OrderModel.getOrderHistory(request.params.userId).then((result) => {
          result = (result) ? result : 'No order in your history';
          response.status(200).json({ status: 'success', data: result });
        });
    }
  }

  getOrders(request, response) {
    OrderModel.getOrders().then((result) => {
      response.status(200).json({ status: 'success', data: result });
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
      response.status(400).json({ status: 'error', message: 'invalid status' });
    }
  }

  getOrder(request, response) {
    OrderModel.getOrder(request.params.orderId).then((result) => {
      if (result.length === 1) {
        response.status(200).json({ status: 'success', data: result[0] });
      } else {
        response.status(400).json({ status: 'error', message: 'invalid order ID' });
      }
    });
  }
}

export default new OrderController();
