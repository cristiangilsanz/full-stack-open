import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  if (anecdote.content.length < 5) {
    throw new Error('Anecdote must be at least 5 characters long')
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const updateVotes = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updated)
  return response.data
}

export default { getAnecdotes, createNew, updateVotes }