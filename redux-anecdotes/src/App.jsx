import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => {
    if(a.votes === b.votes)
      return 0
    return a.votes < b.votes ? 1 : -1
  }))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type:'vote', payload: { id } })
  }

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.Anecdote.value
    e.target.Anecdote.value = ''

    dispatch({type:'add', payload: { content } })
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
      <form onSubmit = { addAnecdote }>
        <div><input name='Anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App