class LoginPOM {
    elements = {
        visitPage: () => cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'),
        usernameInput: () => cy.get('[name="username"]'),
        passwordInput: () => cy.get('[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'),
        userRequired: () => cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > span')
        .should('contain.text', 'Required'),
        passRequired: () => cy.get('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(3) > div > span')
        .should('contain.text', 'Required'),
        resetPassword: () => cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header'),
        dashboardHeader: () => cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module'),
        userDropdown: () => cy.get('.oxd-userdropdown-name'),
        logoutLink: () => cy.get('.oxd-userdropdown-link[href="/web/index.php/auth/logout"]'),
        loginTitle: () => cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title')
    }
    typeonUsername(username){
        this.elements.usernameInput().type(username);
    }
    typeonPassword(password){
        this.elements.passwordInput().type(password);
    }
    clickOnLoginBtn(){
        this.elements.loginBtn().click();
    }
    clickOnResetPassword(){
        this.elements.resetPassword().click();
    }
    userLogout(){
        this.elements.dashboardHeader().should('contain.text', 'Dashboard');
        this.elements.userDropdown().click();
        this.elements.logoutLink().click();
    }
    verifyLoginPageTitle() {
        this.elements.loginTitle().should('have.text', 'Login');
    }
}

export default LoginPOM;