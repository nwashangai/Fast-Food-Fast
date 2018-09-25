import FoodModel from '../models//FoodModel';
class FoodController {
    addFood(request, response) {
        FoodModel.addFood(request.body).then((result) => {
            response.status(200).json({ status: 'success', data: result[0] });
        });
    }

    getFoodMenu(request, response) {
        FoodModel.getFoodMenu().then((result) => {
            if (result.length > 0) 
                response.status(200).json({ status: 'success', data: result });
            else
                response.status(200).json({ status: 'success', data: 'No food menu available' });
        });
    }
}

export default new FoodController();