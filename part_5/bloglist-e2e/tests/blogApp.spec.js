import { test, expect } from '@playwright/test'
import {
  createUser,
  login,
  logout,
  createBlog,
  viewBlog,
  hideBlog,
  likeBlog,
  deleteBlog,
  verifyBlogOrder
} from './helper.js'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await createUser(request)
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('text=Log in to application')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.locator('button:has-text("login")')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)
      await expect(page.locator('text=User logged in')).toBeVisible()
      await expect(page.locator('button:has-text("logout")')).toBeVisible()
      await expect(page.locator('h2:has-text("blogs")')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'user', 'wrongpassword')
      await expect(page.locator('.notification.error')).toBeVisible()
      await expect(page.locator('.notification.error')).toContainText('Wrong username or password')
      await expect(page.locator('text=User logged in')).not.toBeVisible()
      await expect(page.locator('text=Log in to application')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await login(page)
      await expect(page.locator('text=User logged in')).toBeVisible()
    })

    test('a blog can be created', async ({ page }) => {
      await createBlog(page)
      await expect(page.locator('.blog')).toContainText('Blog')
      await expect(page.locator('.blog')).toContainText('Author')
      await expect(page.locator('.notification.success')).toContainText('A new blog "Blog" by Author added')
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page)
      await viewBlog(page, 'Blog', 'Author')
      await expect(page.locator('.blog-view-details')).toContainText('0 likes')
      await page.locator('.blog-view-details button:has-text("like")').click()
      await expect(page.locator('.blog-view-details')).toContainText('1 likes')
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page)
      await deleteBlog(page, 'Blog', 'Author')
      await expect(page.locator('.blog').filter({ hasText: 'Blog Author' })).not.toBeVisible()
    })

    test('only the user who added the blog sees the delete button', async ({ page, request }) => {
      await createBlog(page)
      await viewBlog(page, 'Blog', 'Author')
      await expect(page.locator('.blog-view-details button:has-text("remove")')).toBeVisible()

      await hideBlog(page, 'Blog', 'Author')
      await logout(page)

      await createUser(request, 'Second User', 'second', 'password')
      await login(page, 'second', 'password')
      await expect(page.locator('text=Second User logged in')).toBeVisible()

      await viewBlog(page, 'Blog', 'Author')
      await expect(page.locator('.blog-view-details button:has-text("remove")')).not.toBeVisible()
    })

    test('blogs should be organized from most likes to least likes', async ({ page }) => {
      await createBlog(page, 'Blog1', 'Author1')
      await page.waitForTimeout(500)

      await createBlog(page, 'Blog2', 'Author2')
      await page.waitForTimeout(500)

      await createBlog(page, 'Blog3', 'Author3')
      await page.waitForTimeout(500)

      await likeBlog(page, 'Blog2', 'Author2', 10)
      await hideBlog(page, 'Blog2', 'Author2')

      await likeBlog(page, 'Blog1', 'Author1', 5)
      await hideBlog(page, 'Blog1', 'Author1')

      await likeBlog(page, 'Blog3', 'Author3', 3)
      await hideBlog(page, 'Blog3', 'Author3')

      await verifyBlogOrder(page, [
        { title: 'Blog2', author: 'Author2' },
        { title: 'Blog1', author: 'Author1' },
        { title: 'Blog3', author: 'Author3' }
      ])
    })
  })
})
