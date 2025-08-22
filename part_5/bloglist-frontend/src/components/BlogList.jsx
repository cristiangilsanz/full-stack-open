
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {
  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
        ))}
    </div>
  )
}

export default BlogList