import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const { data: anecdotes, isLoading, isError } = useAnecdotes()

  if (isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (isError) {
    return <div>Anecdote service is not available</div>
  }

  return (
    <div>
      <h1>Anecdote app</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App