import FoodModel from '../models/FoodModel';
import userModel from '../models/UserModel';
import { isValidMenuItem, isUUID, isAddress, isEmail, isName, isPhoneNumber } from '../utils/validator';
require('dotenv').config();

class ValidatorController {
    foodItems(request, response, next) {
        let isValid = 1;
        if (!request.body.address || isAddress(request.body.address) !== true) {
            response.status(400).json({ status: 'error', message: 'Invalid Address' });
        } else {
            const count = (request.body.foodItems) ?
            (Array.isArray(request.body.foodItems)) ?
            request.body.foodItems.length : 0 : 0;
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
                        return (response.status(400).json({ status: 'error', message: 'Please provide both food item and quantity'}));
                    }
                });
            } else {
                return (response.status(400).json({ status: 'error', message: 'No food items'}));
            }
        }
    }

    signUp(request, response, next) {
        let isValid = 1;
        isValid = (!isEmail(request.body.email) || !request.body.email) ?
            'Invalid email id' : (!isName(request.body.name) || !request.body.name) ?
            'Name should be alphabets only with no space' : (!request.body.phone || !isPhoneNumber(request.body.phone)) ?
            'Phone number should be 11 digits' : (!request.body.password || !((request.body.password.length || '') > 4)) ?
            'Password should not be less than 4 characters' : isValid;
        userModel.getEmail(request.body.email).then((result) => {
            if (result.length > 0) {
                return (response.status(409).json({
                    status: 'error',
                    message: 'Duplicate email address'
                }));
            }
            if (isValid === 1) {
                next();
            } else {
                return (response.status(400).json({
                    status: 'error',
                    message: isValid
                }));
            }
        });
    }

    login(request, response, next) {
        if (!request.body.email | !isEmail(request.body.email)) {
            return (response.status(400).json({
                status: 'error',
                message: 'Invalid or no email address'
            }));
        } else if (!request.body.password) {
            return (response.status(400).json({
                status: 'error',
                message: 'Invalid password'
            }));
        } else {
            next();
        }
    }

    menu(request, response, next) {
        let isValid = 1;
        if (request.auth.email !== process.env.ADMIN) {
            return (response.status(403).json({
                status: 'error',
                message: 'Forbidden'
            }));
        } else {
            if (request.method === 'PUT' && !isUUID(request.params.menuId)) {
                return (response.status(400).json({
                    status: 'error',
                    message: 'Invalid menu ID'
                }));
            }
            isValid = isValidMenuItem(request.body);
            if (isValid !== 'valid') {
                return (response.status(400).json({
                    status: 'error',
                    message: isValid
                }));
            } else {
                request.body.image = request.body.image || null;
                next();
            }
        }
    }

    order(request, response, next) {
        if (request.auth.email !== process.env.ADMIN) {
            return (response.status(403).json({
                status: 'error',
                message: 'Forbidden'
            }));
        } else {
            if (isUUID(request.params.orderId)) {
                next();
            } else {
                return (response.status(400).json({
                    status: 'error',
                    message: 'Invalid order ID'
                }));
            }
        }
    }

    deleteMenu(request, response, next) {
        if (request.auth.email !== process.env.ADMIN) {
            return (response.status(403).json({
                status: 'error',
                message: 'Forbidden'
            }));
        } else {
            if (isUUID(request.params.menuId)) {
                next();
            } else {
                return (response.status(400).json({
                    status: 'error',
                    message: 'Invalid order ID'
                }));
            }
        }
    }

    getOrders(request, response, next) {
        if (request.auth.email !== process.env.ADMIN) {
            return (response.status(403).json({
                status: 'error',
                message: 'Forbidden'
            }));
        } else {
            next();
        }
    }
}

export default new ValidatorController();
