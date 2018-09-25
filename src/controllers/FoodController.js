import FoodModel from '../models//FoodModel';
class FoodController {
    addFood(request, response) {
        FoodModel.addFood(request.body).then((result) => {
            response.status(200).json({ status: 'success', data: result });
        });
    }
}

export default new FoodController();