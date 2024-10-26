const request = require('supertest')
const app = require('../app')

let user
let TOKEN
let cityId

const BASE_URL = "/api/v1/cities"

const city = {
  name: "Lima",
  country: "Peru",
  countryId: "PE"
}

beforeAll(async () => {
  user = await request(app)
    .post("/api/v1/users")
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
    .post("/api/v1/users/login")
    .send(credentials)

  TOKEN = resToken.body.token
  
})

afterAll(async () => {
  await request(app)
    .delete(`/api/v1/users/${user.body.id}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})


//!PRIVADO
test("POST -> 'BASE_URL', should return status code 201, and res.body.name === city.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(city)
    .set('Authorization', `Bearer ${TOKEN}`)

  cityId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(city.name)
})

//?PUBLICO
test("GET -> 'BASE_URL', should return status code 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(BASE_URL)


  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].name).toBe(city.name)
})

//!PRIVADO
test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.name === city.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${cityId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(city.name)
})

//!PRIVADO
test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.name === cityUpdate.name", async () => {

  const cityUpdate = {
    name: "Arequipa"
  }

  const res = await request(app)
    .put(`${BASE_URL}/${cityId}`)
    .send(cityUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(cityUpdate.name)
})

//!PRIVADO
test("REMOVE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${cityId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)
})


