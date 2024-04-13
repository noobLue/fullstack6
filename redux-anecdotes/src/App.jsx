import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => {
    if(a.votes === b.votes)
      return 0
    return a.votes < b.votes ? 1 : -1
  }))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const submitAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.Anecdote.value
    e.target.Anecdote.value = ''

    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit = { submitAnecdote }>
        <div><input name='Anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App