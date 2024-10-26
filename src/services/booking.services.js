const { booking, hotel } = require('../models');

const getAllBooking = async (hotelId) => {
  const where = hotelId ? { hotelId } : {}
  return await booking.findAll({
    where,
    include: [hotel]
  });
}

const createBooking = async (body) => {
  return await booking.create(body);
}

const getoneBooking = async (id) => {
  return await booking.findByPk(id, { include: [hotel] });
}

const putBooking = async (body, id) => {
  return await booking.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeBooking = async (id) => {
  return await booking.destroy({ where: { id } });
}


module.exports = {
  getAllBooking,
  createBooking,
  getoneBooking,
  putBooking,
  removeBooking,
}