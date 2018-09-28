import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
require('dotenv').config();

class UserController {
    signUp(request, response) {
      UserModel.createUser(request.body).then((result) => {
          const payload = {
              userId: result[0].id,
              email: result[0].email
          };
          result[0].token = jwt.sign(payload, process.env.SECRET_KEY);
          response.status(201).json({ status: 'success', data: result[0] });
      });
    }

    login(request, response) {
      UserModel.login(request.body.email).then((result) => {
          const output = (result.length < 1) ? 'email address does not exist' :
          (bcrypt.compareSync(request.body.password, result[0].password)) ? 'verified' :
          'wrong password';
          if (output !== 'verified') {
              response.status(400).json({ status: 'error', message: output });
          } else {
              const payload = {
                  userId: result[0].id,
                  email: result[0].email
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY);
              response.status(200).json({ status: 'success', token });
          }
      });
    }
}

export default new UserController();