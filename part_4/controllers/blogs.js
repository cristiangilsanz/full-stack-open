const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, author, url, likes } = request.body
  
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'forbidden: user not authorized to delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  )

  if (!updatedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter