import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote (state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    },
    addAnecdote (state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initAnecdotes = () =>
{
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()

    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) =>
{
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)

    dispatch(addAnecdote(anecdote))
  }
}

export const createVote = (anecdote) => {
  return async dispatch => {
    const newObj = { ...anecdote, votes: anecdote.votes + 1 }
    const res = await anecdoteService.putNew(newObj)

    dispatch(addVote(res))
  }
}

export default anecdoteSlice.reducer