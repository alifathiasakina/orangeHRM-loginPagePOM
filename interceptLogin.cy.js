/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error to console for debugging
    console.error(err);
    
    // Prevent Cypress from failing the test due to uncaught exceptions
    return false;
  });

  describe('Login Test with GET Intercept', () => {

    it('User Login with Valid credentials', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionSummary");
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
    });
    
    it('Should log in with valid credentials and verify GET response code 200', () => {
        cy.intercept('GET', '/web/index.php/dashboard/index').as('dashboardRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.wait('@dashboardRequest').its('response.statusCode').should('eq', 200);
    });
});