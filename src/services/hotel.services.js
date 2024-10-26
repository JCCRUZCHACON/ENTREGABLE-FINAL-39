const { hotel, city } = require('../models');

const getAllServices = async () => {
  const services = await hotel.findAll({ include: [city] });
  return services
};

const createServices = async (body) => {
  return await hotel.create(body)
}

const getOneServices = async (id) => {
  return await hotel.findByPk(id, { include: [city] })
}

const updateServices = async (body, id) => {
  return await hotel.update(body, { where: { id }, returning: true });
};

const removeServices = async (id) => {
  return await hotel.destroy({ where: { id } });
};

module.exports = {
  getAllServices,
  createServices,
  getOneServices,
  updateServices,
  removeServices
}