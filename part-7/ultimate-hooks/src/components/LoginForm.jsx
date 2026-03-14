import { useUserDispatch } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const userDispatch = useUserDispatch()
  const notify = useNotificationDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
    } catch (exception) {
      notify({ type: 'SET', payload: 'wrong username or password' })
      setTimeout(() => notify({ type: 'CLEAR' }), 5000)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 card p-4 shadow-sm">
          <h2 className="text-center mb-4">Log in</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">username</label>
              <input
                name="username"
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
