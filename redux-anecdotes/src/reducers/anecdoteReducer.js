import { createSlice } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer