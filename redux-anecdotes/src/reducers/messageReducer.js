import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: '', timeoutId: -1 }

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageChange (state, action) {
      if (state.timeoutId !== -1)
        clearTimeout(state.timeoutId)

      return action.payload
    },
    messageReset () {
      return initialState
    }
  }
})


export const { messageChange, messageReset } = messageSlice.actions


export const createMessage = (content, timeoutLen) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(messageReset())
    }, timeoutLen)

    dispatch(messageChange({ content, timeoutId }))
  }
}

export default messageSlice.reducer