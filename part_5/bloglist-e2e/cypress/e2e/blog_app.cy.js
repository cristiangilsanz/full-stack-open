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
} from './helper'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    createUser()
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application').should('be.visible')
    cy.get('input[name="Username"]').should('be.visible')
    cy.get('input[name="Password"]').should('be.visible')
    cy.get('button').contains('login').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      login()
      cy.contains('User logged in').should('be.visible')
      cy.get('button').contains('logout').should('be.visible')
      cy.get('h2').contains('blogs').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      login('user', 'wrongpassword')
      cy.get('.notification.error').should('be.visible')
      cy.get('.notification.error').should('contain.text', 'Wrong username or password')
      cy.contains('User logged in').should('not.exist')
      cy.contains('Log in to application').should('be.visible')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      login()
      cy.contains('User logged in').should('be.visible')
    })

    it('a blog can be created', function() {
      createBlog()
      cy.get('.blog').should('contain.text', 'Blog')
      cy.get('.blog').should('contain.text', 'Author')
      cy.get('.notification.success').should('contain.text', 'A new blog "Blog" by Author added')
    })

    it('a blog can be liked', function() {
      createBlog()
      viewBlog('Blog', 'Author')
      cy.get('.blog-view-details').should('contain.text', '0 likes')
      cy.get('.blog-view-details button').contains('like').click()
      cy.get('.blog-view-details').should('contain.text', '1 likes')
    })

    it('a blog can be deleted by its creator', function() {
      createBlog()
      deleteBlog('Blog', 'Author')
      cy.contains('Blog Author').should('not.exist')
    })

    it('only the user who added the blog sees the delete button', function() {
      createBlog()
      viewBlog('Blog', 'Author')
      cy.get('.blog-view-details button').contains('remove').should('be.visible')

      hideBlog('Blog', 'Author')
      logout()

      createUser('Second User', 'second', 'password')
      login('second', 'password')
      cy.contains('Second User logged in').should('be.visible')

      viewBlog('Blog', 'Author')
      cy.get('.blog-view-details button').contains('remove').should('not.exist')
    })

    it('blogs should be organized from most likes to least likes', function() {
      createBlog('Blog1', 'Author1')
      cy.wait(500)

      createBlog('Blog2', 'Author2')
      cy.wait(500)

      createBlog('Blog3', 'Author3')
      cy.wait(500)

      likeBlog('Blog2', 'Author2', 10)
      hideBlog('Blog2', 'Author2')

      likeBlog('Blog1', 'Author1', 5)
      hideBlog('Blog1', 'Author1')

      likeBlog('Blog3', 'Author3', 3)
      hideBlog('Blog3', 'Author3')

      verifyBlogOrder([
        { title: 'Blog2', author: 'Author2' },
        { title: 'Blog1', author: 'Author1' },
        { title: 'Blog3', author: 'Author3' }
      ])
    })
  })
})