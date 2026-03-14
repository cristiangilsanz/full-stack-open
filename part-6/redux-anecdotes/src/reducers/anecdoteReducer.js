import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteWithNotification = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(showNotification(`New anecdote created: "${anecdote.content}"`, 5))
  }
}

export const voteAnecdoteWithNotification = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.updateVotes(anecdote)
    dispatch(voteAnecdote(updated))
    dispatch(showNotification(`Voted for: "${anecdote.content}"`, 5))
  }
}

export default anecdoteSlice.reducer
