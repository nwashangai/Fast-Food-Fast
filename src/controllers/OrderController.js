import { order } from '../models/store';

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
}

module.exports = new OrderController();
