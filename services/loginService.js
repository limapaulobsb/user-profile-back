require('dotenv').config();

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verify = {
  credentials: async (username = '', email = '', password) => {
    const data = await User.findOne({
      where: { [Op.or]: [{ username }, { email }], password },
    });
    if (!data) {
      throw { statusCode: 404, message: 'Wrong credentials' };
    }
    return data;
  },
};

const login = async ({ username, email, password }) => {
  const userData = await verify.credentials(username, email, password);
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
