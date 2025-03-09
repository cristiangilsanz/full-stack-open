const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

beforeEach(async () => {
  await helper.initializeUsers()
})

describe('POST /api/users', () => {
  test('a new user is added', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    assert.strictEqual(response.body.username, helper.newUser.username)
  })

  test('a new user without a username is added', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserWithoutUsername)
      .expect(400, { error: 'User validation failed: username: Path `username` is required.' })
  })

  test('a new user without a password is added', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserWithoutPassword)
      .expect(400, { error: 'password must be at least 3 characters long' })
  })

  test('a new user without a valid username is added', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserWithShortUsername)
      .expect(400)
      .expect(res => {
        assert(res.body.error.includes('is shorter than the minimum allowed length (3)'))
      })
  })

  test('a new user without a valid password is added', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserWithShortPassword)
      .expect(400, { error: 'password must be at least 3 characters long' })
  })

  test('an existing user is added', async () => {
    await api
      .post('/api/users')
      .send(helper.duplicatedUser)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})