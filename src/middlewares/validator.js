import { food } from '../models/store';

export default (request, response, next) => {
    let isValid = 1;
    if (request.body.foodItems) {
        request.body.foodItems.forEach((element) => {
            if (element.foodId && element.quantity) {
              isValid = (food.find(item => item.id === element.foodId) === undefined) ?
                        'Invalid food Id in cart' : ((typeof element.quantity) !== 'number') ?
                        'Invalid quantity type in cart' : isValid;
            } else {
                isValid = 'Please provide all fields';
            }
        });
        if(isValid === 1) {
            next();
        } else {
            return (response.status(400).json({ status: 'error', message: isValid }));
        }
    } else {
       next();
    }
}