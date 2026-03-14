import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs }) => {
  if (!blogs) return null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: '#dee2e6',
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <div className="mt-4">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} style={blogStyle} className="p-2 mb-2 shadow-sm">
              <Link
                to={`/blogs/${blog.id}`}
                className="text-decoration-none fw-bold"
              >
                {blog.title} {blog.author}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BlogList
