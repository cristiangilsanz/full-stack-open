const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

beforeEach(async () => {
    const users = await helper.initializeUsers()
    const rootUser = users.find(user => user.username === 'rootUser')
    await helper.initializeBlogs(rootUser._id)
})

describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs have property id instead of _id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('POST /api/blogs', () => {
    test('a new blog is added', async () => {
        const token = await helper.loginUser('rootUser', 'testPassword')

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const addedBlog = blogsAtEnd.find(blog => blog.title === helper.newBlog.title)

        assert.ok(addedBlog)
        assert.strictEqual(addedBlog.author, helper.newBlog.author)
        assert.strictEqual(addedBlog.url, helper.newBlog.url)
        assert.strictEqual(addedBlog.likes, helper.newBlog.likes)
    })

    test('a new blog is added without a token', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('a new blog without likes is added', async () => {
        const token = await helper.loginUser('rootUser', 'testPassword')

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('a new blog without a title or url is added', async () => {
        const token = await helper.loginUser('rootUser', 'testPassword')

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlogMissingTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(helper.newBlogMissingUrl)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('DELETE /api/blogs/:id', () => {
    test('an existing blog is deleted', async () => {
        const token = await helper.loginUser('rootUser', 'testPassword')
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)
        assert.ok(!titles.includes(blogToDelete.title))
    })

    test('a non-existing blog is deleted', async () => {
        const token = await helper.loginUser('rootUser', 'testPassword')
        const nonExistingId = await helper.nonExistingId()
        const blogsAtStart = await helper.blogsInDb()

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('an existing blog is deleted by a user who is not the owner', async () => {
        const unauthorizedToken = await helper.loginUser('testUser', 'testPassword')
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${unauthorizedToken}`)
            .expect(403)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
})

describe('PUT /api/blogs/:id', () => {
    test('an existing blog is updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(helper.dataToUpdateAnyBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.title, helper.dataToUpdateAnyBlog.title)
        assert.strictEqual(response.body.author, helper.dataToUpdateAnyBlog.author)
        assert.strictEqual(response.body.url, helper.dataToUpdateAnyBlog.url)
        assert.strictEqual(response.body.likes, helper.dataToUpdateAnyBlog.likes)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

        const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
        assert.strictEqual(updatedBlog.title, helper.dataToUpdateAnyBlog.title)
        assert.strictEqual(updatedBlog.author, helper.dataToUpdateAnyBlog.author)
        assert.strictEqual(updatedBlog.url, helper.dataToUpdateAnyBlog.url)
        assert.strictEqual(updatedBlog.likes, helper.dataToUpdateAnyBlog.likes)
    })

    test('a non-existing blog is updated', async () => {
        const nonExistingId = await helper.nonExistingId()
        const blogsAtStart = await helper.blogsInDb()

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send(helper.dataToUpdateAnyBlog)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})