import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      const blogWithUser = {
        ...returnedBlog,
        user: typeof blog.user === 'object' ? blog.user : null
      }

      setBlogs(blogs.map(b => b.id === blog.id ? blogWithUser : b))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleDelete = async () => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const canDelete = user && blog.user && (blog.user.username === user.username)

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-view-toggle">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-view-details">
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {canDelete && (
            <button onClick={handleDelete}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
}

export default Blog