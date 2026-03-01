import { useCreateAnecdote } from '../hooks/useAnecdotes'
import { useNotificationDispatch } from '../hooks/useNotification'

const AnecdoteForm = () => {
  const setNotification = useNotificationDispatch()
  const createAnecdoteMutation = useCreateAnecdote()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    
    if (!content) {
      setNotification('Anecdote cannot be empty', 'error')
      return
    }

    if (content.length < 5) {
      setNotification('Anecdote must be at least 5 characters long', 'error')
      return
    }

    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input 
          name='anecdote' 
          disabled={createAnecdoteMutation.isPending}
        />
        <button 
          type="submit"
          disabled={createAnecdoteMutation.isPending}
        >
          {createAnecdoteMutation.isPending ? 'creating...' : 'create'}
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm