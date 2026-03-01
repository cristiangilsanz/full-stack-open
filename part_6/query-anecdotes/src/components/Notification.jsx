import { useNotificationValue } from '../hooks/useNotification'

const Notification = () => {
  const notification = useNotificationValue()

  const notificationStyle = {
    padding: '12px 16px',
    margin: '12px 0',
    borderRadius: '4px',
    fontWeight: '500',
    border: '1px solid',
    backgroundColor: notification.type === 'error' ? '#f8d7da' : '#d4edda',
    color: notification.type === 'error' ? '#721c24' : '#155724',
    borderColor: notification.type === 'error' ? '#f5c6cb' : '#c3e6cb'
  }
  
  if (!notification.message) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification