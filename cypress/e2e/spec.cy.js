describe("Successful login", () => {
  it("Login with existing user", () => {
    cy.visit(Cypress.env("appUrl"))
    cy.contains("Sign in").click()

    cy.get('input[name=email]').type(Cypress.env("email0"))
    cy.get('input[name=password]').type(Cypress.env("password00"))
    cy.get('button[type=submit]').click()

    cy.contains("Password is incorrect").should('not.exist')
  })
})

describe("Failed login", () => {
  it("Login with incorrect password", () => {
    cy.visit(Cypress.env("appUrl"))
    cy.contains("Sign in").click()

    cy.get('input[name=email]').type(Cypress.env("email0"))
    cy.get('input[name=password]').type(Cypress.env("password01"))
    cy.get('button[type=submit]').click()

    cy.contains("Password is incorrect")
  })
})