import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type || 'success'
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        type: null
      }
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null
  })

  const setNotification = (message, type = 'success', timeout = 5000) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type }
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext