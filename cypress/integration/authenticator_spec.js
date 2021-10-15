describe('Authenticator:', function() {
    beforeEach(function() {
        cy.visit('/login');
    });
    describe('Sign In:', () => {
        it('Allows normal user to signin', () => {
            cy.get(selectors.usernameInput).type(
                login.username
            );
            cy.get(selectors.signInPasswordInput).type(
                login.password
            );
            cy.get(selectors.signInSignInButton).click();
            cy.wait(3000)
            cy.url().should('include','/userdashboard');
        });
    });
  });
  export const selectors = {
    usernameInput: '#email',
    signInPasswordInput: '#password',
    signInSignInButton: '.btn',
    root: '#root'
  };

  export const login = {
    username: Cypress.env('username'),
    password: Cypress.env('password')
};