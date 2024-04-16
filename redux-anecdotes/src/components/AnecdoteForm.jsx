import { useDispatch, useSelector } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { messageChange, messageReset } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const prevTimeoutId = useSelector(({ message }) => message.timeoutId)

  const submitAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.Anecdote.value
    e.target.Anecdote.value = ''

    dispatch(addAnecdote(content))

    if (prevTimeoutId !== -1)
      clearTimeout(prevTimeoutId)
    const timeoutId = setTimeout(() => {
      dispatch(messageReset())
    }, 5000)
    dispatch(messageChange({ content: `You added new anecdote '${content}'`, timeoutId }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = { submitAnecdote }>
        <div><input name='Anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm