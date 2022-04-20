const { Op } = require('sequelize');
const { User } = require('../models');

const verify = {
  authorization: (id, session) => {
    if (id !== session.id && !session.admin) {
      throw { statusCode: 401, message: 'Unauthorized' };
    }
  },
  fields: (...fields) => {
    fields.forEach((field) => {
      if (!field) throw { statusCode: 400, message: 'Missing fields' };
    });
  },
  email: (email) => {
    const re = /\S+@\S+\.\S+/;
    if (email && !re.test(email)) {
      throw { statusCode: 400, message: 'Invalid email' };
    }
  },
  password: (password) => {
    if (password && password.length < 6) {
      throw { statusCode: 400, message: 'Invalid password' };
    }
  },
  userExists: async (option, ...query) => {
    const data = await User.findOne({ where: { [Op.or]: query } });
    if (option && data) {
      throw { statusCode: 400, message: 'User already exists' };
    }
    if (!option && !data) {
      throw { statusCode: 404, message: 'User not found' };
    }
  },
};

const create = async (payload) => {
  const { username, email, password } = payload;
  verify.fields(username, email, password);
  verify.email(email);
  verify.password(password);
  await verify.userExists(true, { username }, { email });
  return User.create(payload);
};

const findAll = () => User.findAll({ attributes: { exclude: ['password', 'admin'] } });

const findById = async (id) => {
  await verify.userExists(false, { id });
  return User.findByPk(id, { attributes: { exclude: ['password', 'admin'] } });
};

const update = async (id, payload, session) => {
  const { email, password } = payload;
  verify.authorization(id, session);
  verify.email(email);
  verify.password(password);
  await verify.userExists(false, { id });
  return User.update(payload, { where: { id } });
};

const destroy = async (id, session) => {
  verify.authorization(id, session);
  await verify.userExists(false, { id });
  return User.destroy({ where: { id } });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};
