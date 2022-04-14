require('dotenv').config();

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (payload) => {
  const { username = '', email = '', password } = payload;
  const userData = await User.findOne({
    where: { [Op.or]: [{ username }, { email }], password },
  });

  if (!userData) {
    throw { statusCode: 404, message: 'Wrong credentials' };
  }

  const jwtData = {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    admin: userData.admin,
  };
  const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };
  const token = jwt.sign(jwtData, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  login,
};
