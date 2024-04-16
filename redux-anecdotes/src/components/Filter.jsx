import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()

  const updateFilter = (e) => {
    dispatch(filterChange(e.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={updateFilter} />
    </div>
  )
}

export default Filter