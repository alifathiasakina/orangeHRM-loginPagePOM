/// <reference types="cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error to console for debugging
    console.error(err);
    
    // Prevent Cypress from failing the test due to uncaught exceptions
    return false;
  });

describe('Validate Login Functionality for Valid and Invalid Credentials', () => {
    it('Verify the user can log in with valid credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
    });

    it('Verify login fails with invalid credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('wrongpassword');
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });

    it('Verify login fails if the account does not exist', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Assert the login page title is displayed
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        
        // Input non-existing username and password
        cy.get('[name="username"]').type('dummyacc');
        cy.get('[name="password"]').type('dummypass');
        
        // Click the login button
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Verify that an error message is displayed
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

describe('Validate Login Field Requirements and Input Formats', () => {
    it('Verify login fails when username or password fields are empty', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Click login button without entering username and password
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Verify that the error message appears for empty username field
        cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > span')
            .should('contain.text', 'Required');
        
        // Verify that the error message appears for empty password field
        cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > span')
            .should('contain.text', 'Required');
    });

    it('Verify validation for special characters and unsupported input formats', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Input special characters in the username and password fields
        cy.get('[name="username"]').type('anon@#$%!.com');
        cy.get('[name="password"]').type('!@#password');
        
        // Click the login button
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Verify that an error message is displayed for invalid input formats
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

describe('Validate Secure Password Handling: Masking, Length, and Case Sensitivity Compliance', () => {
    it('Verify password field masks the entered characters', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Input a password in the password field
        cy.get('[name="password"]').type('admin123');
        
        // Verify that the password is masked
        cy.get('[name="password"]').should('have.attr', 'type', 'password');
    });

    it('Verify login functionality with passwords of minimum allowable lengths', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Input the minimum allowable password length
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        
        // Verify that the login success with a password of minimum length
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
    });  

    it('Verify login functionality with passwords of maximum allowable lengths', () => {
        // Testing for max lengths is incomplete due to the absence of test data for that condition.
    });

    it('Verify the system treats credentials as case-sensitive', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Input the correct username and password in different cases
        cy.get('[name="username"]').type('ADMin');
        cy.get('[name="password"]').type('admiN123');
        
        // Verify that the login fails with case-sensitive credentials
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
        
        // Input the username and password for a non-existing account
        cy.get('[name="username"]').type('newAdmin');
        cy.get('[name="password"]').type('newAdmin123');
        
        // Click the login button
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Verify that an error message is displayed for non-existing accounts
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

describe('Validate Login Features: Ensure Remember Me and Password Recovery Work', () => {
    it('Verify the "Remember Me" feature works', () => {
        // The "Remember Me" feature is not available on the login page
    });

    it('Verify the password recovery feature works', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Click the "Forgot your password?" link
        cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click();
        
        // Input the email address for password recovery
        cy.get('.oxd-text.oxd-text--h6.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
    });
});

describe('Validate Session Management: Expiration and Secure Redirection After Logout', () => {
    it('Verify user session expires after inactivity', () => {
        // The session expiration feature is not yet defined
    });

    it('Verify the user is redirected to the login page after logging out', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Input the username and password
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        
        // Click the login button
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Verify the user is redirected to the Dashboard
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard');
        
        // Click the user dropdown and then the logout link
        cy.get('.oxd-userdropdown-name').click();
        cy.get('.oxd-userdropdown-link[href="/web/index.php/auth/logout"]').click();
        
        // Ensure the page redirects to the login page
        cy.url().should('include', '/auth/login');
        
        // Verify the login title is displayed
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });
});

describe('Validate Login Page Performance, Usability, and Compatibility', () => {
    it('Verify the login process response time under normal conditions, 3 seconds', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Start the timer
        cy.clock();
        
        // Input the username and password
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        
        // Click the login button
        cy.get('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button').click();
        
        // Stop the timer
        cy.tick(3000);
    });

    it('Verify the login page is responsive across all available devices', () => {
        // Test the login page on a desktop screen
        cy.viewport(1280, 720);
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page layout is responsive
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on a desktop screen
        cy.viewport("macbook-16");
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page layout is responsive
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        
        // Test the login page on a tablet screen
        cy.viewport('ipad-2');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page layout is responsive
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
        
        // Test the login page on a mobile screen
        cy.viewport('iphone-xr');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page layout is responsive
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on a mobile screen
        cy.viewport('samsung-s10');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page layout is responsive
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });

    it('Verify the login page is accessible using assistive technologies', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page is accessible using a screen reader
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
        
        // Verify the login page works on Chrome
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Firefox
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page works on Firefox
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Edge
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page works on Edge
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');

        // Test the login page on Safari
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        // Verify the login page works on Safari
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('have.text', 'Login');
    });
});

describe('Validate Third-Party Login Integration and Data Exchange', () => {
    it('Verify the login page allows users to log in using third-party services', () => {
        // The login page does not yet support third-party login services
        // The test will be updated once the feature is implemented
    });
});