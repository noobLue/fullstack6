import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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
  initialState,
  reducers: {
    addVote (state, action) {
      return state.map(createMapper(action.payload))
    },
    addAnecdote (state, action) {
      return state.concat(asObject(action.payload))
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})


export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer