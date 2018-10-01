import FoodModel from '../models/FoodModel';
class FoodController {
    addFood(request, response) {
        FoodModel.addFood(request.body).then((result) => {
            response.status(201).json({ status: 'success', data: result[0] });
        });
    }

    getFoodMenu(request, response) {
        FoodModel.getFoodMenu().then((result) => {
            response.status(200).json({ status: 'success', data: result });
        });
    }

    updateFoodMenu(request, response) {
        FoodModel.updateFoodMenu(request.params.menuId, request.body).then((result) => {
            if (result.length > 0) 
                response.status(200).json({ status: 'success', update: result[0] });
            else
                response.status(400).json({ status: 'error', message: 'Invalid menu ID' });
        });
    }

    deleteFood(request, response) {
        FoodModel.deleteFood(request.params.menuId).then((result) => {
            if (result.length > 0) 
                response.status(200).json({ status: 'success', deleted: result[0] });
            else
                response.status(400).json({ status: 'error', message: 'Invalid menu ID' });
        });
    }
}

export default new FoodController();