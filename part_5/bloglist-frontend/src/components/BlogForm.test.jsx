import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  it('should call event handler with right details when new blog is created', async () => {
    const user = userEvent.setup()
    const createBlogMock = vi.fn()

    render(<BlogForm createBlog={createBlogMock} />)

    const titleInput = screen.getByLabelText(/title:/i)
    const authorInput = screen.getByLabelText(/author:/i)
    const urlInput = screen.getByLabelText(/url:/i)
    const createButton = screen.getByRole('button', { name: /create/i })

    await user.type(titleInput, 'Title')
    await user.type(authorInput, 'Author')
    await user.type(urlInput, 'https://url.com')
    await user.click(createButton)

    expect(createBlogMock).toHaveBeenCalledTimes(1)
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Title',
      author: 'Author',
      url: 'https://url.com',
    })
  })
})
