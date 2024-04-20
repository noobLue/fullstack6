import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, putAnecdote } from './services/anecdoteRequests'




const App = () => {
  const queryClient = useQueryClient()

  const likeMutation = useMutation({ 
    mutationFn: putAnecdote,
    onSuccess: (newAnecdote) => {
      const old = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], old.map(a => a.id !== newAnecdote.id ? a : newAnecdote))
    }
   })

  const handleVote = (anecdote) => {
    likeMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const anecdoteFunc = (data) => {
    return (<div>
      {data.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </div>)
  }


  const statePicker = () => {
    if (result.isLoading)
    {
      return <div>Loading anecdotes...</div>
    }
    else if (result.isPending)
    {
      return <div>This feature might be disabled</div>
    }
    else if (result.isError) 
    {
      return <div>There was an error loading the anecdotes. ({ result.error.message })</div>
    }
    else 
    {
      return anecdoteFunc(result.data)
    }
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      { statePicker() }
    </div>
  )
}

export default App
