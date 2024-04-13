import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => {
    if(a.votes === b.votes)
      return 0
    return a.votes < b.votes ? 1 : -1
  }))

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
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
    </div>
  )
}


export default AnecdoteForm