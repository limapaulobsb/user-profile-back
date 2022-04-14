const { Op } = require('sequelize');
const { User } = require('../models');

const emailIsValid = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const create = async (payload) => {
  const { username, email, password } = payload;
  if (!username || !email || !password) {
    throw { statusCode: 400, message: 'Missing fields' };
  }
  if (!emailIsValid(email)) {
    throw { statusCode: 400, message: 'Invalid email' };
  }
  if (password.length < 6) {
    throw { statusCode: 400, message: 'Invalid password' };
  }
  const userData = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
  if (userData) {
    throw { statusCode: 400, message: 'User already exists' };
  }
  return User.create(payload);
};

const findAll = () => User.findAll({ attributes: { exclude: ['password'] } });

const findById = (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const update = async (id, payload, session) => {
  if (Number(id) !== session.id) {
    throw { statusCode: 401, message: 'Unauthorized' };
  }
  const { email, password } = payload;
  if (email && !emailIsValid(email)) {
    throw { statusCode: 400, message: 'Invalid email' };
  }
  if (password && password.length < 6) {
    throw { statusCode: 400, message: 'Invalid password' };
  }
  // const userData = await User.findByPk(id);
  // if (!userData) {
  //   throw { statusCode: 404, message: 'User not found' };
  // }
  return User.update(payload, { where: { id } });
};

const destroy = async (id, session) => {
  if (Number(id) !== session.id) {
    throw { statusCode: 401, message: 'Unauthorized' };
  }
  // const userData = await User.findByPk(id);
  // if (!userData) {
  //   throw { statusCode: 404, message: 'User not found' };
  // }
  return User.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};
