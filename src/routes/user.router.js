const { getAll, create, getOne, remove, update, login, logged } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');
const loginMiddlewares = require('../middlewares/login.middlewares');
const sessionJWT = require('../middlewares/sessionJWT.middlewares');
const fieldsDeleteUpdate = require('../middlewares/fieldsDeleteUpdate.middlewares');
const { passwordMiddlewares } = require('../middlewares/password.middlewares');


const userRouter = express.Router();

userRouter.route('/')
  .get(verifyJWT, getAll)
  .post(passwordMiddlewares, create);

userRouter.route('/login')
  .post(loginMiddlewares, sessionJWT, login)

userRouter.route('/me')
  .get(verifyJWT, logged)

userRouter.route('/:id')
  .get(verifyJWT, getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, fieldsDeleteUpdate, update);

module.exports = userRouter;