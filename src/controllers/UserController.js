import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
require('dotenv').config();

class UserController {
    signUp(request, response) {
      UserModel.createUser(request.body).then((result) => {
          response.status(200).json({ status: 'success', data: result });
      });
    }

    login(request, response) {
      UserModel.login(request.body.email).then((result) => {
          const output = (!result) ? 'email address does not exist' :
          (bcrypt.compareSync(request.body.password, result.password)) ? 'verified' :
          'wrong password';
          if (output !== 'verified') {
              response.status(400).json({ status: 'error', message: output });
          } else {
              delete result.password;
              const payload = {
                  userId: result.id,
                  email: result.email
              };
              result.token = jwt.sign(payload, process.env.SECRET_KEY);
              response.status(200).json({ status: 'success', data: result });
          }
      });
    }
}

export default new UserController();