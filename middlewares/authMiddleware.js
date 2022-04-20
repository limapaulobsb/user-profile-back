require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { statusCode: 404, message: 'Token not found' };
    }
    req.session = jwt.verify(authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    if (
      error.message === 'invalid token' ||
      error.message === 'invalid signature' ||
      error.message === 'jwt expired'
    ) {
      next({ statusCode: 401, message: 'Authentication failed' });
    } else {
      next(error);
    }
  }
};
