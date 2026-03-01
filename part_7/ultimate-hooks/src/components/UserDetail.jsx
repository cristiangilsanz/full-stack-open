const UserDetail = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul className="list-group">
        {user.blogs.map((b) => (
          <li key={b.id} className="list-group-item">
            {b.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UserDetail
