require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { statusCode: 404, message: 'Token not found' };
    }

    req.user = jwt.verify(authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (error.message === 'invalid token' || error.message === 'invalid signature') {
      next({ statusCode: 401, message: 'Authentication failed' });
    } else {
      next(error);
    }
  }
};
