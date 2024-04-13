import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.Anecdote.value
    e.target.Anecdote.value = ''

    dispatch(addAnecdote(content))
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