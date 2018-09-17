import { order } from '../models/store';
import updateOrder from '../utils/updateOrder';

class OrderController {
  setOrder(request, response) {
    request.body.datatime = new Date();
    request.body.status = 'pending';
    request.body.id = Math.floor(Math.random() * 10000000000000000000000000).toString();
    order.push(request.body);
    response.status(200).json({ status: 'success', message: 'Order placed', entry: request.body });
  }

  getOrders(request, response) {
    if (request.params.id) {
      const userOrder = order.filter(order => order.id === request.params.id);
      response.status(200).json({ status: 'success', data: userOrder });
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
