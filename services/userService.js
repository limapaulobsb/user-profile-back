const { User } = require('../models');

const create = (payload) => User.create(payload);

const findAll = () => User.findAll();

const findById = (id) => User.findByPk(id);

const update = (payload, id) => User.update(payload, { where: { id } });

const destroy = (id) => User.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};
