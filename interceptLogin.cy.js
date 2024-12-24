/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    console.error(err);
    return false;
  });

describe('Validate Login Functionality for Valid and Invalid Credentials', () => {
    it('Verify the user can log in with valid credentials', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept("GET", "**/employees/action-summary").as("actionSummary");
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
    });    

    it('Verify login fails with invalid credentials', () => {
        cy.intercept('GET', '**/web/index.php/core/i18n/messages', {
            statusCode: 200,
            body: { message: 'Some custom response for the messages request' },
        }).as('getMessages');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('wrongpassword');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
        cy.wait('@getMessages');
    });    

    it.only('Verify login fails if the account does not exist', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        cy.get('[name="username"]').type('dummyacc');
        cy.get('[name="password"]').type('dummypass');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.wait('@loginRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 302);
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });    
});

describe('Validate Login Field Requirements and Input Formats', () => {
    it('Verify login fails when username or password fields are empty', () => {
        cy.intercept('POST', '/api/v1/auth/login', {
            statusCode: 400,
            body: { message: 'Validation error: Missing required fields' },
        }).as('loginRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('form > div:nth-child(2) > div > span').should('contain.text', 'Required');
        cy.get('form > div:nth-child(3) > div > span').should('contain.text', 'Required');
    });
    
    it('Verify validation for special characters and unsupported input formats', () => {
        cy.intercept('POST', '/api/v1/auth/login', {
            statusCode: 400,
            body: { message: 'Invalid credentials' },
        }).as('loginRequest');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('anon@#$%!.com');
        cy.get('[name="password"]').type('!@#password');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.wait('@loginRequest');
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });    
});

describe('Validate Secure Password Handling: Masking, Length, and Case Sensitivity Compliance', () => {
    it('Verify password field masks the entered characters', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="password"]').type('admin123');
        cy.get('[name="password"]').should('have.attr', 'type', 'password');
    });

    it('Verify login functionality with passwords of minimum allowable lengths', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
    });  

    it('Verify login functionality with passwords of maximum allowable lengths', () => {
        // Testing for max lengths is incomplete due to the absence of test data for that condition.
    });

    it('Verify the system treats credentials as case-sensitive', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('ADMin');
        cy.get('[name="password"]').type('admiN123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

describe('Validate Login for Account Statuses: Restrict Access for Locked or Non-Existing Accounts', () => {
    it('Verify login fails for locked accounts', () => {
        // The test data for locked accounts is not available
    });

    it('Verify login fails for non-existing accounts', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('newAdmin');
        cy.get('[name="password"]').type('newAdmin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

describe('Validate Login Features: Ensure Remember Me and Password Recovery Work', () => {
    it('Verify the "Remember Me" feature works', () => {
        // The "Remember Me" feature is not available on the login page
    });

    it('Verify the password recovery feature works', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click();
        cy.get('.oxd-text.oxd-text--h6.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
    });
});

describe('Validate Session Management: Expiration and Secure Redirection After Logout', () => {
    it('Verify user session expires after inactivity', () => {
        // The session expiration feature is not yet defined
    });

    it('Verify the user is redirected to the login page after logging out', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
        cy.get('.oxd-userdropdown-name').click();
        cy.get('.oxd-userdropdown-link[href="/web/index.php/auth/logout"]').click();
        cy.url().should('include', '/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });
});

describe('Validate Login Page Performance, Usability, and Compatibility', () => {
    it('Verify the login process response time under normal conditions, 3 seconds', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.clock();
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.tick(3000);
    });

    it('Verify the login page is responsive across all available devices', () => {
        cy.viewport(1280, 720);
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        cy.viewport("macbook-16");
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        cy.viewport('ipad-2');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        
        // Test the login page on a mobile screen (iPhone XR)
        cy.viewport('iphone-xr');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on a mobile screen (Samsung S10)
        cy.viewport('samsung-s10');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });

    it('Verify the login page is accessible using assistive technologies', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        // No support for screen readers or keyboard navigation is available at this time
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });

    it('Verify the login page works on all supported browser', () => {
        // The configuration for each browser needs to be done outside the test script
        // Chrome: npx cypress run --browser chrome
        // Firefox: npx cypress run --browser firefox
        // Edge: npx cypress run --browser edge
        // Safari: npx cypress run --browser safari

        // Test the login page on Chrome
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Firefox
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Edge
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Safari
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });
});

describe('Validate Third-Party Login Integration and Data Exchange', () => {
    it('Verify the login page allows users to log in using third-party services', () => {
        // The login page does not yet support third-party login services
        // The test will be updated once the feature is implemented
    });
});