# Cypress Test Suite: Login Functionality and Security
This repository contains a set of Cypress test scripts designed to validate various aspects of the login functionality for the OrangeHRM application. The tests cover scenarios for valid and invalid credentials, password handling, account statuses, and more.

## Table of Contents
1. Introduction
2. Test Scenarios
3. Prerequisites
4. Test Setup
5. Running the Tests
6. Notes

## Introduction
These Cypress tests are designed to validate the functionality, security, and performance of the login page for the OrangeHRM application. The tests ensure that different login scenarios are handled correctly, including login with valid and invalid credentials, field validation, and password security.

## Test Scenarios
1. Valid and Invalid Credentials
* **Verify login with valid credentials**: Ensure that a user can log in using valid credentials.
* **Verify login fails with invalid credentials**: Test login failure for invalid username and/or password.
* **Verify login fails for non-existing accounts**: Ensure login fails if the account does not exist.
2. Field Requirements and Input Formats
* **Empty fields validation**: Ensure the system displays errors when login fields are left empty.
* **Special characters validation**: Test that special characters in the username and password fields are handled correctly.
3. Password Handling
* **Password field masking**: Ensure that the password field hides the entered characters.
* **Password length validation**: Verify that passwords with minimum and maximum allowable lengths are handled.
* **Case sensitivity**: Ensure that credentials are treated as case-sensitive.
4. Account Statuses
* **Login failure for locked accounts**: (Test data required) Ensure that locked accounts cannot log in.
* **Login failure for non-existing accounts**: Ensure that a non-existing account cannot log in.
5. Login Features
* **Remember Me feature**: (Not yet available for testing).
* **Password recovery**: Verify that users can recover their password through the "Forgot your password?" feature.
6. Session Management
* **Session expiration**: Verify that user sessions expire after inactivity.
* **Redirection after logout**: Ensure that users are redirected to the login page after logging out.
7. Performance, Usability, and Compatibility
* **Response time**: Test the response time of the login process.
* **Responsive design**: Verify that the login page is responsive across different devices (desktop, tablet, mobile).
* **Browser compatibility**: Ensure that the login page works across multiple browsers.
* **Accessibility**: Test that the login page is accessible via assistive technologies.
8. Third-Party Login Integration
* **Third-party login**: (Feature not yet implemented for testing).

## Prerequisites
* **Cypress**: Make sure that Cypress is installed in your project.
* **Browsers**: Test the login page across Chrome, Firefox, Edge, and Safari.

## Test Setup
1. Clone this repository to your local machine.
2. Install the required dependencies by running:  
   *npm install*
3. Configure the Cypress environment by setting up the desired browsers for the tests.
   
## Running the Tests
1. Run Cypress tests in the command line using the following command:  
   *npx cypress open*  
   This will open the Cypress Test Runner, where you can select the test scenarios you want to run.
2. To run tests in a specific browser, use the following commands:  
   * For Chrome:  
   *npx cypress run --browser chrome*  
   * For Firefox:  
   *npx cypress run --browser firefox*  
   * For Edge:  
   *npx cypress run --browser edge*  
   * For Safari:  
   *npx cypress run --browser safari*
## Notes
* **Uncaught Exception Handling**: The script includes error handling for uncaught exceptions to prevent the tests from failing unexpectedly.
* **Test Data**: Some tests, such as for locked accounts, require specific test data. These tests may be skipped if the data is unavailable.
* **Third-Party Login**: Tests for third-party login services are not implemented yet. These tests will be updated once the feature is available in the application.
