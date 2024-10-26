const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');

const imageRouter = express.Router();

imageRouter.route('/')
  .get(getAll)
  .post(create);

imageRouter.route('/:id')
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = imageRouter;