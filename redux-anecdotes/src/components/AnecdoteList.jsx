import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { messageChange, messageReset } from '../reducers/messageReducer'

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
  const prevTimeoutId = useSelector(({ message }) => message.timeoutId)

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))

    if (prevTimeoutId !== -1)
      clearTimeout(prevTimeoutId)
    const timeoutId = setTimeout(() => {
      dispatch(messageReset())
    }, 5000)
    dispatch(messageChange({ content: `You voted '${anecdote.content}'`, timeoutId }))
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