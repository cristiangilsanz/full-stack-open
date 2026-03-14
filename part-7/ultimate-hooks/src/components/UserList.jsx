import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  if (!users) return null
  return (
    <div>
      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UserList
