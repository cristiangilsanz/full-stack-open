export const createUser = (name = 'User', username = 'user', password = 'password') => {
  const user = { name, username, password }
  cy.request('POST', 'http://localhost:3003/api/users', user)
}

export const login = (username = 'user', password = 'password') => {
  cy.get('input[name="Username"]').type(username)
  cy.get('input[name="Password"]').type(password)
  cy.get('button').contains('login').click()
}

export const logout = () => {
  cy.get('button').contains('logout').click()
}

export const createBlog = (title = 'Blog', author = 'Author', url = 'http://url.com') => {
  cy.get('button').contains('new blog').click()
  cy.get('input[type="text"]').eq(0).type(title)
  cy.get('input[type="text"]').eq(1).type(author)
  cy.get('input[type="text"]').eq(2).type(url)
  cy.get('button[type="submit"]').contains('create').click()
  cy.get('.blog').contains(`${title} ${author}`).should('be.visible')
}

export const viewBlog = (title, author) => {
  cy.get('.blog')
    .contains(`${title} ${author}`)
    .parent()
    .find('button')
    .contains('view')
    .click()
}

export const hideBlog = (title, author) => {
  cy.get('.blog')
    .contains(`${title} ${author}`)
    .parent()
    .find('button')
    .contains('hide')
    .click()
}

export const likeBlog = (title, author, times = 1) => {
  cy.get('.blog').contains(`${title} ${author}`).parent().as('targetBlog')

  cy.get('@targetBlog').find('button').contains('view').click()

  for (let i = 0; i < times; i++) {
    cy.get('@targetBlog').within(() => {
      cy.get('.blog-view-details button').contains('like').click()
      cy.get('.blog-view-details').should('contain', `${i + 1} likes`)
    })
  }
}

export const deleteBlog = (title, author) => {
  cy.get('.blog').contains(`${title} ${author}`).parent().as('targetBlog')

  cy.get('@targetBlog').find('button').contains('view').click()

  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true)
  })

  cy.get('@targetBlog').within(() => {
    cy.get('.blog-view-details button').contains('remove').click()
  })

  cy.contains(`${title} ${author}`).should('not.exist')
}

export const waitForNotificationToDisappear = (message) => {
  cy.get('.notification').contains(message).should('be.visible')
  cy.get('.notification').contains(message, { timeout: 6000 }).should('not.exist')
}

export const verifyBlogOrder = (blogs) => {
  blogs.forEach((blog, index) => {
    cy.get('.blog').eq(index).should('contain', `${blog.title} ${blog.author}`)
  })
}