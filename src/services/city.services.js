const { city } = require('../models');

const getAllCity = async () => {
  return await city.findAll();
}

const createCity = async (body) => {
  return await city.create(body);
}

const getOneCity = async (id) => {
  return await city.findByPk(id);
}

const putCity = async (body, id) => {
  return await city.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeCity = async (id) => {
  return await city.destroy({ where: { id } });
}


module.exports = {
  getAllCity,
  createCity,
  getOneCity,
  putCity,
  removeCity,
}

