const catchError = require('../utils/catchError');
const { getAllReview, createReview, getoneReview, putReview, removeReview } = require('../services/review.services');

const getAll = catchError(async (req, res) => {
  const { hotelId, userId } = req.query
  const results = await getAllReview(hotelId, userId);
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createReview({ ...req.body, userId: req.user.id });
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getoneReview(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeReview(id);
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await putReview(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}