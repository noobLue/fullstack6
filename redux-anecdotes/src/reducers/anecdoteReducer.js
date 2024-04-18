import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const createMapper = (id) => {
  return a => {
    return a.id !== id ? a : {
      ...a,
      votes: a.votes + 1
    }
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote (state, action) {
      return state.map(createMapper(action.payload))
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

export default anecdoteSlice.reducer