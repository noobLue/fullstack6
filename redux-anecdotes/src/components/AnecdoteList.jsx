import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/messageReducer'

const sorter = (a,b) => {
  if(a.votes === b.votes)
    return 0
  return a.votes < b.votes ? 1 : -1
}

const makeFilter = (filter) => {
  return a => a.content.toLowerCase().includes(filter.toLowerCase())
}

const AnecdoteForm = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => anecdotes.filter(makeFilter(filter)).sort(sorter))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(createVote(anecdote))

    dispatch(createMessage(`You voted '${anecdote.content}'`, 5000))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteForm