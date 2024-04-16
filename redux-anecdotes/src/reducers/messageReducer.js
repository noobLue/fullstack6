import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: 'initial message',
  reducers: {
    messageChange (state, action) {
      return action.payload
    }
  }
})


export const { messageChange } = messageSlice.actions
export default messageSlice.reducer