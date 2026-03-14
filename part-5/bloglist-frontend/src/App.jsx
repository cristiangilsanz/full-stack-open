import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

import { useState, useEffect, useRef } from 'react'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [user])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      setUser(userData)
      blogService.setToken(userData.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData))
      notify(`Welcome ${userData.name}`, 'success')
    } catch (error) {
      notify('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    notify('You have logged out', 'success')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      const blogWithUser = {
        ...returnedBlog,
        user: user
      }
      setBlogs(blogs.concat(blogWithUser))
      blogFormRef.current.toggleVisibility()
      notify(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'success')
    } catch (error) {
      notify('Error creating blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <UserInfo user={user} onLogout={handleLogout} />

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
    </div>
  )
}

export default App