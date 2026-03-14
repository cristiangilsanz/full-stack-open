import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter'
import { voteAnecdoteWithNotification } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const { anecdotes, filter } = useSelector(state => state)

  const filteredAnecdotes = [...anecdotes]
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <Filter />
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} 
            <button onClick={() => dispatch(voteAnecdoteWithNotification(anecdote))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
