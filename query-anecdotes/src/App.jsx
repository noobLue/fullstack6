import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from './services/anecdoteRequests'




const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))


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
