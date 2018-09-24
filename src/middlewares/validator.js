import { food } from '../models/store';
import userModel from '../models/UserModel';

export default (request, response, next) => {
    let isValid = 1;
    if (request.method === 'POST' && (request.originalUrl === '/api/v1/orders/' || request.originalUrl === '/api/v1/orders')) {
        const count = (request.body.foodItems) ? (Array.isArray(request.body.foodItems)) ? request.body.foodItems.length : 0 : 0;
        if (!request.body.foodItems === undefined || !count < 1) {
        request.body.foodItems.forEach((element) => {
            if (element.foodId && element.quantity) {
              isValid = (food.find(item => item.id === element.foodId) === undefined) ?
                        'Invalid food Id in cart' : ((typeof element.quantity) !== 'number') ?
                        'Invalid quantity type in cart' : isValid;
            } else {
                isValid = 'Please provide all fields';
            }
        });
    } else {
        isValid = 'No food items';
    }
        if(isValid === 1) {
            next();
        } else {
            return (response.status(400).json({ status: 'error', message: isValid }));
        }
    } else if (request.method === 'POST' && (request.originalUrl === '/api/v1/auth/signup' || request.originalUrl === '/api/v1/auth/signup/')) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = (!regex.test(String(request.body.email)) || !request.body.email) ?
          'Invalid email id': (!/^[A-Za-z]+$/.test(String(request.body.name)) || !request.body.name) ?
          'Invalid name': (!request.body.phone || !/^\d{11}$/.test(request.body.phone)) ?
          'Invalid phone number': (!request.body.password || !((request.body.password.length || '') > 4)) ?
          'password should not be less than 4 characters' : isValid;
      userModel.getEmail(request.body.email).then((result) => {
          if (result) {
              isValid = 'Duplicate email address';
          }
          if(isValid === 1) {
            next();
          } else {
            return (response.status(400).json({ status: 'error', message: isValid }));
          }
      });
    } else if (request.method === 'POST' && (request.originalUrl === '/api/v1/auth/login' || request.originalUrl === '/api/v1/auth/login/')) {
        if(!request.body.email | !request.body.password) {
          return (response.status(400).json({ status: 'error', message: 'provide all fields' }));
        } else {
            next();
        }
    } else {
       next();
    }
}