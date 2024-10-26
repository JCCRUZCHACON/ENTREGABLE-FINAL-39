const express = require('express');
const userRouter = require('./user.router');
const cityRouter = require('./city.router');
const hotelRouter = require('./hotel.router');
const imageRouter = require('./image.router');
const bookingRouter = require('./booking.router');
const reviewRouter = require('./review.router');
const { verifyJWT } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/cities', cityRouter)
router.use('/hotels', hotelRouter)
router.use('/images', verifyJWT, imageRouter)
router.use('/bokings', verifyJWT, bookingRouter)
router.use('/reviews', verifyJWT, reviewRouter)




module.exports = router;