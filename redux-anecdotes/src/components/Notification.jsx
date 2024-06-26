import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ message } ) => message.content)

  if(!notification)
  {
    return (<div></div>)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification