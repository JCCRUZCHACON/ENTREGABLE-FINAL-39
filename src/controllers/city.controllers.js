const catchError = require('../utils/catchError');
const { getAllCity, createCity, getOneCity, putCity, removeCity } = require('../services/city.services');

const getAll = catchError(async (req, res) => {
  const results = await getAllCity();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await createCity(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await getOneCity(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await putCity(req.body, id);
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await removeCity(id);
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}