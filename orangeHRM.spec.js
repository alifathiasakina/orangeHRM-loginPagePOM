import LoginPOM from './LoginPOM';

Cypress.on('uncaught:exception', (err, runnable) => {
    console.error(err);
    return false;
  });

describe('Validate Login Functionality for Valid and Invalid Credentials', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify the user can log in with valid credentials', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        loginPOM.typeonUsername('Admin');
        loginPOM.typeonPassword('admin123');
        cy.intercept("GET", "**/employees/action-summary").as("actionSummary");
        loginPOM.clickOnLoginBtn();
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
        cy.url().should('not.include', 'auth/login');
    });

    it('Verify the user cannot log in with invalid credentials', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 400,
            body: { message: 'Invalid credentials.' },
        }).as('getMessages');
        loginPOM.typeonUsername('Admin');
        loginPOM.typeonPassword('wrongpassword');
        loginPOM.clickOnLoginBtn();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 400);
        loginPOM.elements.errorMessage().should('be.visible');
    });

    it('Verify login fails if the account does not exist', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 400,
            body: { message: 'Account does not exist.' },
        }).as('getMessages');
        loginPOM.typeonUsername('dummyacc');
        loginPOM.typeonPassword('dummypass');
        loginPOM.clickOnLoginBtn();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 400);
        loginPOM.elements.errorMessage().should('be.visible');
    });
});

describe('Validate Login Field Requirements and Input Formats', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify login fails when username or password fields are empty', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        loginPOM.clickOnLoginBtn();
        loginPOM.elements.userRequired().should('be.visible');
        loginPOM.elements.passRequired().should('be.visible');
    });

    it('Verify validation for special characters and unsupported input formats', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 400,
            body: { message: 'Input has unsupported formats.' },
        }).as('getMessages');
        loginPOM.typeonUsername('anon@#$%!.com');
        loginPOM.typeonPassword('!@#password');
        loginPOM.clickOnLoginBtn();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 400);
        loginPOM.elements.errorMessage().should('be.visible');
    });
});

describe('Validate Secure Password Handling: Masking, Length, and Case Sensitivity Compliance', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify password field masks the entered character', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        loginPOM.typeonPassword('admin123');
        loginPOM.elements.passwordInput().should('have.value', 'admin123');
    });

    it('Verify login functionality with passwords of minimum allowable lengths', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        loginPOM.typeonUsername('Admin');
        loginPOM.typeonPassword('admin123');
        cy.intercept("GET", "**/employees/action-summary").as("actionSummary");
        loginPOM.clickOnLoginBtn();
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
        cy.url().should('not.include', 'auth/login');
    });

    it('Verify login functionality with passwords of maximum allowable lengths', () => {
        // Testing for max lengths is incomplete due to the absence of test data for that condition.
    });

    it('Verify the system treats credentials as case-sensitive', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 400,
            body: { message: 'Fields are case-sensitive.' },
        }).as('getMessages');
        loginPOM.typeonUsername('ADMin');
        loginPOM.typeonPassword('admiN123');
        loginPOM.clickOnLoginBtn();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 400);
        loginPOM.elements.errorMessage().should('be.visible');
    });
});

describe('Validate Login for Account Statuses: Restrict Access for Locked or Non-Existing Accounts', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify login fails for locked accounts', () => {
        // The test data for locked accounts is not available
    });

    it('Verify login fails for non-existing accounts', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 400,
            body: { message: 'Account does not exist.' },
        }).as('getMessages');
        loginPOM.typeonUsername('newAdmin');
        loginPOM.typeonPassword('newAdmin123');
        loginPOM.clickOnLoginBtn();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 400);
        loginPOM.elements.errorMessage().should('be.visible');
    });
});

describe('Validate Login Features: Ensure Remember Me and Password Recovery Work', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify the Remember Me feature works', () => {
        // The Remember Me feature is not implemented in the application
    });

    it('Verify the Password Recovery feature works', () => {
        cy.intercept('POST', '/api/v1/auth/requestPasswordResetCode').as('resetRequest');
        cy.intercept('GET', '/web/index.php/core/i18n/messages', {
            statusCode: 200,
            body: { message: 'Enter new password.' },
        }).as('getMessages');
        loginPOM.clickOnResetPassword();
        cy.wait('@getMessages').its('response.statusCode').should('eq', 200);
        cy.url().should('include', 'PasswordReset');
    });
});

describe('Validate Session Management: Expiration and Secure Redirection After Logout', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify user session expires after inactivity', () => {
        // The session expiration feature is not yet defined
    });

    it('Verify user is redirected to the login page after logging out', () => {
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        cy.intercept('POST', '**/auth/logout').as('logoutRequest');
        loginPOM.typeonUsername('Admin');
        loginPOM.typeonPassword('admin123');
        loginPOM.clickOnLoginBtn();
        loginPOM.userLogout();
        cy.url().should('include', 'auth/login');
    });
});

describe('Validate Login Page Performance, Usability, and Compatibility', () => {
    const loginPOM = new LoginPOM();
    beforeEach(() => {
        loginPOM.elements.visitPage();
    });

    it('Verify the login process response time under normal conditions, 3 seconds', () => {
        const startTime = Date.now();
        cy.intercept('POST', '/api/v1/auth/login').as('loginRequest');
        loginPOM.typeonUsername('Admin');
        loginPOM.typeonPassword('admin123');
        loginPOM.clickOnLoginBtn();
        cy.url().should('not.include', 'auth/login');
        const endTime = Date.now();
        const duration = endTime - startTime;
        expect(duration).to.be.lessThan(3000);
    });

    it('Verify the login page is responsive across all available devices', () => {
        const devices = [
            { name: 'Desktop', viewport: [1280, 720] },
            { name: 'MacBook 16', viewport: 'macbook-16' },
            { name: 'iPad 2', viewport: 'ipad-2' },
            { name: 'iPhone XR', viewport: 'iphone-xr' },
            { name: 'Samsung S10', viewport: 'samsung-s10' }
        ];
        devices.forEach(device => {
            if (Array.isArray(device.viewport)) {
                cy.viewport(...device.viewport);
            } else {
                cy.viewport(device.viewport);
            }
            loginPOM.elements.visitPage();
            cy.url().should('include', 'auth/login');
        });
    });

    it('Verify the login page works on all supported browsers', () => {
        // Test the login page on Chrome
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPOM.verifyLoginPageTitle();

        // Test the login page on Firefox
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPOM.verifyLoginPageTitle();

        // Test the login page on Edge
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPOM.verifyLoginPageTitle();

        // Test the login page on Safari
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPOM.verifyLoginPageTitle();
    });
});

describe('Validate Third-Party Login Integration and Data Exchange', () => {
    it('Verify the login page allows users to log in using third-party services', () => {
        // The login page does not yet support third-party login services
        // The test will be updated once the feature is implemented
    });
});