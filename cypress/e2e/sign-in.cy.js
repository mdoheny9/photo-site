describe('Sign in', () => {
  context('successful login', () => {
    it("can sign in without error message", () => {
      cy.visit(Cypress.env("appUrl"))
      cy.get('input[name=email]').type(Cypress.env("email0"))
      cy.get('input[name=password]').type(Cypress.env("password00"))
      cy.get('button[type=submit]').click()
      cy.contains("Password is incorrect").should('not.exist')
    })

    it('can sign in and out and be redirected to sign-in page', () => {
      cy.visit(Cypress.env("appUrl"))
      cy.get('input[name=email]').type(Cypress.env("email0"))
      cy.get('input[name=password]').type(Cypress.env("password00"))
      cy.get('button[type=submit]').click()
      cy.contains("Sign out").click()
      cy.contains("Sign in")

    })
  })

  context('failed login', () => {
    it("can see error message when using incorrect password", () =>{
      cy.visit(Cypress.env("appUrl"))
      cy.get('input[name=email]').type(Cypress.env("email0"))
      cy.get('input[name=password]').type(Cypress.env("password01"))
      cy.get('button[type=submit]').click()
      cy.contains("Password is incorrect")
    })
  })
})