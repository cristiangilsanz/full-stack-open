import { expect } from '@playwright/test'

export const createUser = async (request, name = 'User', username = 'user', password = 'password') => {
  await request.post('http://localhost:3003/api/users', {
    data: { username, name, password }
  })
}

export const login = async (page, username = 'user', password = 'password') => {
  await page.fill('input[name="Username"]', username)
  await page.fill('input[name="Password"]', password)
  await page.click('button:has-text("login")')
}

export const logout = async (page) => {
  await page.click('button:has-text("logout")')
}

export const createBlog = async (page, title = 'Blog', author = 'Author', url = 'http://url.com') => {
  await page.click('button:has-text("new blog")')
  await page.locator('input[type="text"]').nth(0).fill(title)
  await page.locator('input[type="text"]').nth(1).fill(author)
  await page.locator('input[type="text"]').nth(2).fill(url)
  await page.click('button[type="submit"]:has-text("create")')
  await page.locator('.blog').filter({ hasText: `${title} ${author}` }).waitFor()
}

export const viewBlog = async (page, title, author) => {
  await page.locator('.blog').filter({ hasText: `${title} ${author}` }).locator('button:has-text("view")').click()
}

export const hideBlog = async (page, title, author) => {
  await page.locator('.blog').filter({ hasText: `${title} ${author}` }).locator('button:has-text("hide")').click()
}

export const likeBlog = async (page, title, author, times = 1) => {
  const blog = page.locator('.blog').filter({ hasText: `${title} ${author}` })

  await blog.locator('button:has-text("view")').click()

  for (let i = 0; i < times; i++) {
    await blog.locator('.blog-view-details button:has-text("like")').click()
    await blog.locator('.blog-view-details').getByText(`${i + 1} likes`).waitFor()
  }
}

export const deleteBlog = async (page, title, author) => {
  const blog = page.locator('.blog').filter({ hasText: `${title} ${author}` })

  await blog.locator('button:has-text("view")').click()

  page.on('dialog', async dialog => {
    await dialog.accept()
  })

  await Promise.all([
    page.waitForResponse(response =>
      response.url().includes('/api/blogs') &&
      response.request().method() === 'DELETE'
    ),
    blog.locator('.blog-view-details button:has-text("remove")').click()
  ])

  await expect(page.locator('.blog').filter({ hasText: `${title} ${author}` })).not.toBeVisible()
}

export const waitForNotificationToDisappear = async (page, message) => {
  await page.locator('.notification').getByText(message).waitFor()
  await page.locator('.notification').getByText(message).waitFor({ state: 'detached' })
}

export const verifyBlogOrder = async (page, blogs) => {
  const blogElements = await page.locator('.blog').all()
  for (let i = 0; i < blogs.length; i++) {
    await expect(blogElements[i]).toContainText(`${blogs[i].title} ${blogs[i].author}`)
  }
}