const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  }
]

const initialUsers = [
  {
    username: 'testUser',
    name: 'Test User',
    password: 'testPassword'
  },
  {
    username: 'rootUser',
    name: 'Root User',
    password: 'testPassword'
  }
]

const newBlog = {
  title: 'This is an example',
  author: 'Author 1',
  url: 'http://example.com/example1',
  likes: 10
}

const newBlogWithoutLikes = {
  title: 'This is an example without likes',
  author: 'Author 2',
  url: 'http://example.com/example2'
}

const newBlogMissingTitle = {
  author: 'Author 3',
  url: 'http://example.com/example3'
}

const newBlogMissingUrl = {
  title: 'This is an example without url',
  author: 'Author 4'
}

const dataToUpdateAnyBlog = {
  title: 'This is an updated example',
  author: 'Updated Author',
  url: 'http://updated.com',
  likes: 150
}

const newUser = {
  username: 'testUser2',
  name: 'Test User 2',
  password: 'testPassword'
}

const duplicatedUser = {
    username: 'testUser',
    name: 'Test User',
    password: 'testPassword'
}

const newUserWithoutUsername = {
  name: 'Test User 2',
  password: 'testPassword'
}

const newUserWithoutPassword = {
  username: 'testUser2',
  name: 'testPassword'
}

const newUserWithShortUsername = {
  username: '-',
  name: 'Test User 2',
  password: 'testPassword'
}

const newUserWithShortPassword = {
  username: 'testUser2',
  name: 'Test User 2',
  password: '-'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getBlogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog ? blog.toJSON() : null
}

const getUserById = async (id) => {
  const user = await User.findById(id)
  return user ? user.toJSON() : null
}

const nonExistingId = async () => {
  return new mongoose.Types.ObjectId()
}

const initializeBlogs = async (userId) => {
  await Blog.deleteMany({})
  
  const blogsWithUser = initialBlogs.map(blog => ({
    ...blog,
    user: userId
  }))
  
  await Blog.insertMany(blogsWithUser)
}

const initializeUsers = async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('testPassword', 10)
  
  const users = initialUsers.map(user => ({
    username: user.username,
    name: user.name,
    passwordHash
  }))
  
  const userObjects = users.map(user => new User(user))
  const savedUsers = await Promise.all(userObjects.map(user => user.save()))
  
  return savedUsers
}

const loginUser = async (username, password) => {
  const response = await api
    .post('/api/login')
    .send({ username, password })
  
  return response.body.token
}

module.exports = {
  initialBlogs,
  initialUsers,
  newBlog,
  newBlogWithoutLikes,
  newBlogMissingTitle,
  newBlogMissingUrl,
  dataToUpdateAnyBlog,
  newUser,
  duplicatedUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortUsername,
  newUserWithShortPassword,
  blogsInDb,
  usersInDb,
  getBlogById,
  getUserById,
  nonExistingId,
  initializeBlogs,
  initializeUsers,
  loginUser
}