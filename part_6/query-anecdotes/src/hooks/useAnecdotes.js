import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useNotificationDispatch } from './useNotification'

export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes,
    retry: false
  })
}

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  return useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`New anecdote created: "${newAnecdote.content}"`, 'success')
    },
    onError: (error) => {
      setNotification(
        error.response?.data?.error || error.message || 'Error creating anecdote', 
        'error'
      )
    }
  })
}

export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationDispatch()

  return useMutation({
    mutationFn: anecdoteService.updateVotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
      setNotification(`Voted for: "${updatedAnecdote.content}"`, 'success')
    },
    onError: (error) => {
      setNotification('Error voting on anecdote', 'error')
    }
  })
}
