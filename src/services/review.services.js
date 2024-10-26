const { review, hotel } = require('../models');

const getAllReview = async (hotelId, userId) => {
  const where = hotelId && userId ? { hotelId, userId } : {}
  return await review.findAll({
    where,
    include: [hotel]
  });
}

const createReview = async (body) => {
  return await review.create(body);
}

const getoneReview = async (id) => {
  return await review.findByPk(id, { include: [hotel] });
}

const putReview = async (body, id) => {
  return await review.update(
    body,
    { where: { id }, returning: true }
  );
}

const removeReview = async (id) => {
  return await review.destroy({ where: { id } });
}


module.exports = {
  getAllReview,
  createReview,
  getoneReview,
  putReview,
  removeReview,
}