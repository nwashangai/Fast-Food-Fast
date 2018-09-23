import UserModel from '../models/UserModel';

class UserController {
    signUp(request, response) {
      UserModel.createUser(request.body).then((result) => {
          response.status(200).json({ status: 'success', data: result });
      });
    }
}

export default new UserController();