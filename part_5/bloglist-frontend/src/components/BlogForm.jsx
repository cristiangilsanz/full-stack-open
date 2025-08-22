import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new</h3>
      <div>
        <label>
    title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
    author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
    url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </label>
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm