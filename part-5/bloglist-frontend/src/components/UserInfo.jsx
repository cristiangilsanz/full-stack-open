const UserInfo = ({ user, onLogout }) => {
  return (
    <p>
      {user.name} logged in <button onClick={onLogout}>logout</button>
    </p>
  )
}

export default UserInfo