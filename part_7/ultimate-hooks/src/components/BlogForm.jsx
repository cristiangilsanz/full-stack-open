import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notify({
        type: 'SET',
        payload: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      })
      setTimeout(() => notify({ type: 'CLEAR' }), 5000)
    },
    onError: () => {
      notify({ type: 'SET', payload: 'error creating blog' })
      setTimeout(() => notify({ type: 'CLEAR' }), 5000)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    newBlogMutation.mutate(content)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div className="card p-3 bg-light">
      <h4>create new</h4>
      <form onSubmit={addBlog}>
        <div className="mb-2">
          title: <input name="title" className="form-control form-control-sm" />
        </div>
        <div className="mb-2">
          author:{' '}
          <input name="author" className="form-control form-control-sm" />
        </div>
        <div className="mb-2">
          url: <input name="url" className="form-control form-control-sm" />
        </div>
        <button type="submit" className="btn btn-success btn-sm">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
