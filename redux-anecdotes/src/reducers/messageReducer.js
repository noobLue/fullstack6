import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: '', timeoutId: -1 }

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageChange (state, action) {
      return action.payload
    },
    messageReset () {
      return initialState
    }
  }
})


export const { messageChange, messageReset, setTimeout } = messageSlice.actions
export default messageSlice.reducer