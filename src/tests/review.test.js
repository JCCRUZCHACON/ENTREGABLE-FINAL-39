require('../models')
const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let hotel
let hotelId
let review
let reviewId

const BASE_URL = '/api/v1/reviews'

beforeAll(async () => {
  user = await request(app)
    .post('/api/v1/users')
    .send({
      firstName: "juan",
      lastName: "cruz",
      email: "juan@gmail.com",
      password: "juan1234",
      gender: "male"
    })

  const credentials = {
    email: "juan@gmail.com",
    password: "juan1234"
  }

  const resToken = await request(app)
    .post('/api/v1/users/login')
    .send(credentials)

  TOKEN = resToken.body.token


  hotel = await request(app)
    .post('/api/v1/hotels')
    .send({
        name: "Hyatt Centric San Isidro",
        description: "El Sheraton Lima Hotel & Convention Center, conocido simplemente como Hotel Sheraton es un hotel de 5 estrellas",
        price: "316",
        address: "Paseo de los Héroes Navales, primera cuadra del Paseo de la República en pleno centro de Lima",
        lat: "-12.05725",
        lon: "-77.03688",
        raiting: "4.0",
    })
    .set('Authorization', `Bearer ${TOKEN}`)

  hotelId = hotel.body.id

  review = {
    hotelId: hotel.body.id,
    rating: 5,
    comment: "The room was super comfortable and clean, the staff was very friendly and attentive",
  }

})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${user.body.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  await request(app)
    .delete(`/api/v1/hotels/${hotelId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})

test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(review)
    .set('Authorization', `Bearer ${TOKEN}`)

  reviewId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(review.comment)
})


test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].comment).toBe(review.comment)
})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(review.comment)
})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

  const reviewUpdate = {
    comment: "The room was super comfortable and clean, the staff was very friendly and attentive"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${reviewId}`)
    .send(reviewUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.comment).toBe(reviewUpdate.comment)
})


test("REMOVE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${reviewId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})