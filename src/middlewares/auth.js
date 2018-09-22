import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.development.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: 'error', message: 'authentication failed' });
      }
      req.auth = decoded;
      next();
    });
  } else {
    return res.status(403).send({ status: 'error', message: 'No token provided.' });
  }
}