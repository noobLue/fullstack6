import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMessage } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (e) => {
    e.preventDefault()

    const content = e.target.Anecdote.value
    e.target.Anecdote.value = ''

    //const res = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))

    /*
    if (prevTimeoutId !== -1)
      clearTimeout(prevTimeoutId)
    const timeoutId = setTimeout(() => {
      dispatch(messageReset())
    }, 5000)
    dispatch(messageChange({ content: `You added new anecdote '${content}'`, timeoutId }))
    */

    dispatch(createMessage(`You added new anecdote '${content}'`, 5000))
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