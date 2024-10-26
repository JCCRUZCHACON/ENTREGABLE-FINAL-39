const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const cityRouter = express.Router();

cityRouter.route('/')
  .get(getAll)
  .post(verifyJWT, create);

cityRouter.route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = cityRouter;