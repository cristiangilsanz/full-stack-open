import { useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import blogService from './services/blogs'
import userService from './services/users'

import { useUserValue, useUserDispatch } from './UserContext'
import { useNotificationValue } from './NotificationContext'

import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import LoginForm from './components/LoginForm'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notification = useNotificationValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const userMatch = useMatch('/users/:id')
  const matchedUser =
    userMatch && usersResult.data
      ? usersResult.data.find((u) => u.id === userMatch.params.id)
      : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog =
    blogMatch && blogsResult.data
      ? blogsResult.data.find((b) => b.id === blogMatch.params.id)
      : null

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({ type: 'LOGOUT' })
  }

  if (!user) return <LoginForm />

  const navStyle = { padding: 10, backgroundColor: '#e9ecef', marginBottom: 20 }

  return (
    <div className="container">
      <nav style={navStyle}>
        <Link style={{ padding: 5 }} to="/">
          blogs
        </Link>
        <Link style={{ padding: 5 }} to="/users">
          users
        </Link>
        <span style={{ marginLeft: 10 }}>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      </nav>

      <h2 className="my-4">blog app</h2>

      {notification && <div className="alert alert-info">{notification}</div>}

      <Routes>
        <Route path="/" element={<BlogList blogs={blogsResult.data} />} />
        <Route path="/users" element={<UserList users={usersResult.data} />} />
        <Route path="/users/:id" element={<UserDetail user={matchedUser} />} />
        <Route path="/blogs/:id" element={<BlogDetail blog={matchedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
