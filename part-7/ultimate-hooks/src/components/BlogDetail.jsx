import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogDetail = ({ blog }) => {
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
  })

  if (!blog) return null

  const addComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    commentMutation.mutate({ id: blog.id, comment })
    e.target.comment.value = ''
  }

  return (
    <div className="card p-4">
      <h3>
        {blog.title} - {blog.author}
      </h3>
      <div className="my-2">
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes{' '}
          <button className="btn btn-sm btn-primary">like</button>
        </p>
        <p>added by {blog.user?.name || 'anonymous'}</p>
      </div>

      <h4>comments</h4>
      <form onSubmit={addComment} className="mb-3">
        <input name="comment" className="form-control d-inline w-50" />
        <button type="submit" className="btn btn-secondary ms-2">
          add comment
        </button>
      </form>
      <ul className="list-group list-group-flush">
        {blog.comments?.map((c, i) => (
          <li key={i} className="list-group-item">
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default BlogDetail
