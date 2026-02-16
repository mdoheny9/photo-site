describe('Sign up', () => {
    context('failed sign up', () => {
        it('can see error message on invalid email', () => {
          cy.visit(Cypress.env("appUrl")+"sign-up")
          
          cy.get('input[name=user').type("validusername")
          cy.get('input[name=email]').type("invalidemail")
          cy.get('input[name=password]').type(Cypress.env("password00"))
          cy.get('button[type=submit]').click()

          cy.contains("Email is not valid")
        })

        it('can see error message on invalid password', () => {
          cy.visit(Cypress.env("appUrl")+"sign-up")
          
          cy.get('input[name=user').type("validusername")
          cy.get('input[name=email]').type("validemail@gmail.com")
          cy.get('input[name=password]').type("123")
          cy.get('button[type=submit]').click()

          cy.contains("Password must contain at least 8 characters")
        })

        it('can see redirect message on pre-existing email', () => {
          cy.visit(Cypress.env("appUrl")+"sign-up")

          cy.get('input[name=user]').type("newUsername")
          cy.get('input[name=email]').type(Cypress.env("email0"))
          cy.get('input[name=password]').type("newpassword123")
          cy.get('button[type=submit]').click()

          cy.contains("User already exists")

        })
    })
})