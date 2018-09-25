import FoodModel from '../models/FoodModel';
import userModel from '../models/UserModel';
import { isValidMenuItem, isUUID } from '../utils/validator';
require('dotenv').config();

export default (request, response, next) => {
    let isValid = 1;
    if (request.method === 'POST' && (request.originalUrl === '/api/v1/orders/' || request.originalUrl === '/api/v1/orders')) {
        const count = (request.body.foodItems) ? (Array.isArray(request.body.foodItems)) ? request.body.foodItems.length : 0 : 0;
        if (!request.body.foodItems === undefined || !count < 1) {
        request.body.foodItems.forEach((element, index, arr) => {
            if (element.foodId && element.quantity) {
              FoodModel.getFood(element.foodId).then((result) => {
                  isValid = (result < 1) ? 'Invalid food Id in cart' : 
                  ((typeof element.quantity) !== 'number') ?
                      'Invalid quantity type in cart': isValid;
                if (index === arr.length - 1) {
                    request.body.userId = request.auth.userId;
                    if(isValid === 1) {
                        request.body.userId = request.auth.userId;
                        next();
                    } else {
                        return (response.status(400).json({ status: 'error', message: isValid }));
                    }
                }
              }).catch((error) => {
                 response.status(422).json({ status: 'error', message: 'Invalid food item Id' });
             });
            } else {
                return (response.status(400).json({ status: 'error', message: 'Please provide all fields'}));
            }
        });
    } else {
        return (response.status(400).json({ status: 'error', message: 'No food items'}));
    }
    } else if (request.method === 'POST' && (request.originalUrl === '/api/v1/auth/signup' || request.originalUrl === '/api/v1/auth/signup/')) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = (!regex.test(String(request.body.email)) || !request.body.email) ?
          'Invalid email id': (!/^[A-Za-z]+$/.test(String(request.body.name)) || !request.body.name) ?
          'Invalid name': (!request.body.phone || !/^\d{11}$/.test(request.body.phone)) ?
          'Invalid phone number': (!request.body.password || !((request.body.password.length || '') > 4)) ?
          'password should not be less than 4 characters' : isValid;
      userModel.getEmail(request.body.email).then((result) => {
          if (result.length > 0) {
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
    } else if (request.method === 'POST' && (request.originalUrl === '/api/v1/menu' || request.originalUrl === '/api/v1/menu/')) {
        if (request.auth.email !== process.env.ADMIN) {
          return (response.status(401).json({ status: 'error', message: 'Unathorized' }));
        } else {
            isValid = isValidMenuItem(request.body);
            if (isValid !== 'valid') {
                return (response.status(400).json({ status: 'error', message: isValid }));
            } else {
              request.body.image = request.body.image || null;
              next();
            }
        }
    } else if ((request.method === 'PUT' || request.method === 'GET') && request.params.orderId) {
        if (request.auth.email !== process.env.ADMIN) {
          return (response.status(401).json({ status: 'error', message: 'Unathorized' }));
        } else {
        if (isUUID(request.params.orderId)) {
            next();
            } else {
            return (response.status(400).json({ status: 'error', message: 'Invalid order ID' }));
            }
        }
    } else if (request.method === 'GET' && (request.originalUrl === '/api/v1/orders' || request.originalUrl === '/api/v1/orders/')) {
        if (request.auth.email !== process.env.ADMIN) {
          return (response.status(401).json({ status: 'error', message: 'Unathorized' }));
        } else {
          next();
        }
    } else {
       next();
    }
}