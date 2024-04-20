import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdoteRequests"
import { useContext } from "react"
import MessageContext from "../MessageContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [message, messageDispatch] = useContext(MessageContext)

  const anecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const old = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], old.concat(newAnecdote))

      const timeoutId = setTimeout(() => messageDispatch({type: 'RESET'}), 5000)
      messageDispatch({type: 'SET', payload: {message: `You added a new anecdote '${newAnecdote.content}!'`, timeoutId}})
    },
    onError: (error) => {
      if(error.code === 'ERR_BAD_REQUEST')
      {
        const timeoutId = setTimeout(() => messageDispatch({type: 'RESET'}), 5000)
        messageDispatch({type: 'SET', payload: {message: `Failed to add anecdote, it was shorter than 5 characters`, timeoutId}})
      }
      else 
      {
        // Unknown error
      }
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    anecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
