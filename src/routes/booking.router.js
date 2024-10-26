const { getAll, create, getOne, remove, update } = require('../controllers/booking.controllers');
const express = require('express');

const bookingRouter = express.Router();

bookingRouter.route('/')
  .get(getAll)
  .post(create);

bookingRouter.route('/:id')
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = bookingRouter;