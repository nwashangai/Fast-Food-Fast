import { order } from '../models/store';

export default (id, status) => {
  let count = 0;
  const updated = [];
  for (let index = 0; index < order.length; index++) {
    if (order[index].id === id) {
      order[index].status = status;
      count += 1;
      updated.push(order[index]);
    }
  }
  return { count, updated };
};
