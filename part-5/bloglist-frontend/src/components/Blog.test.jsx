import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import '@testing-library/jest-dom/vitest'

vi.mock('../services/blogs')

describe('<Blog />', () => {
  let container

  const blog = {
    id: '1',
    title: 'Title',
    author: 'Author',
    url: 'http://www.url.com',
    likes: 10,
    user: {
      id: '1',
      name: 'User',
      username: 'user'
    }
  }

  const blogs = [blog]
  const mockSetBlogs = vi.fn()
  const user = { username: 'user' }

  beforeEach(() => {
    vi.clearAllMocks()

    blogService.update.mockResolvedValue({
      id: '1',
      title: 'Title',
      author: 'Author',
      url: 'http://www.url.com',
      likes: 11,
    })

    container = render(
      <Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} user={user} />
    ).container
  })

  test('should show title and author but not url and likes by default', () => {
    const titleAndAuthor = screen.getByText('Title Author')
    expect(titleAndAuthor).toBeDefined()

    const urlElement = screen.queryByText('http://www.url.com')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('10 likes')
    expect(likesElement).toBeNull()
  })

  test('should show url, number of likes and user when view button is clicked', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')

    await user.click(button)

    const urlElement = screen.getByText('http://www.url.com')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('10 likes')
    expect(likesElement).toBeDefined()
  })

  test('should call event handler twice when like button is double clicked', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})