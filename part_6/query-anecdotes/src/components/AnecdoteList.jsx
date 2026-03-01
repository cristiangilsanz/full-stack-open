import PropTypes from 'prop-types'
import AnecdoteItem from './AnecdoteItem'

const AnecdoteList = ({ anecdotes }) => {
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.length === 0 ? (
        <div>No anecdotes</div>
      ) : (
        sortedAnecdotes.map(anecdote => (
          <AnecdoteItem key={anecdote.id} anecdote={anecdote} />
        ))
      )}
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired
    })
  ).isRequired
}

export default AnecdoteList