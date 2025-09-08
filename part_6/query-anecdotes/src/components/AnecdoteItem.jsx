import PropTypes from 'prop-types'
import { useVoteAnecdote } from '../hooks/useAnecdotes'

const AnecdoteItem = ({ anecdote }) => {
  const voteMutation = useVoteAnecdote()

  const handleVote = () => {
    voteMutation.mutate(anecdote)
  }


  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        <span>
          {`has ${anecdote.votes}`}
        </span>
        <button 
          onClick={handleVote}
          disabled={voteMutation.isPending}
        >
          {voteMutation.isPending ? 'voting...' : 'vote'}
        </button>
      </div>
    </div>
  )
}

AnecdoteItem.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
  }).isRequired
}

export default AnecdoteItem