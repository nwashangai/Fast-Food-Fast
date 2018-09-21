import { food } from '../models/store';

export default (request, response, next) => {
    let isValid = 1;
    if (request.body.foodItems) {
        request.body.foodItems.forEach((element) => {
            if (element.foodId && element.qty) {
              isValid = (food.find(item => item.id === element.foodId) === undefined) ?
                        'Invalid food Id in cat' : ((typeof element.qty) !== 'number') ?
                        'Invalid quantity type in cat' : isValid;
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