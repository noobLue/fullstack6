import { createContext, useReducer } from "react";

const initialState = {message: '', timeoutId: -1}

const messageReducer = (state, action) => {
    if(state.timeoutId !== -1)
        clearTimeout(state.timeoutId)

    switch (action.type)
    {
        case 'SET':
            return action.payload
        case 'RESET':
            return initialState
        default:
            return state
    }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(messageReducer, initialState)

    return (
        <MessageContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageContext