const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type)
  {
  case 'filter':
    return action.payload
  default:
    return state
  }
}


export const filterChange = (filter) => {
  return { type:'filter', payload: filter }
}


export default reducer