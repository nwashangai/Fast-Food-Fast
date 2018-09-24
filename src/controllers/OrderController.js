import 'dotenv';
import OrderModel from '../models/OrderModel';
import { order } from '../models/store';
import updateOrder from '../utils/updateOrder';

export class OrderController {
  makeOrder(request, response) {
    OrderModel.makeOrder(request.body).then((result) => {;
        response.status(200).json({ status: 'success', message: 'Order placed', data: result });
      });
    
  }

  getOrders(request, response) {
    if (request.params.id) {
      const userOrder = order.filter(order => order.id === request.params.id);
      if(userOrder.length > 0)
        response.status(200).json({ status: 'success', data: userOrder });
      else
        response.status(422).json({ status: 'error', message: 'Invalid order Id' });
    } else {
      response.status(200).json({ status: 'success', data: order });
    }
  }

  updateOrder(request, response) {
    if (['accepted', 'declined', 'completed'].includes(request.body.status)) {
      const update = updateOrder(request.params.id, request.body.status);
      if (update.count > 0) {
        response.status(200).json({ status: 'success', update });
      } else {
        response.status(400).json({ status: 'error', message: 'invalid order ID' });
      }
    } else {
      response.status(400).json({ status: 'error', message: 'invalid status' });
    }
  }
}

export default new OrderController();
