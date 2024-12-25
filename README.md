# Cypress E2E Testing for OrangeHRM Login

This project contains automated end-to-end tests for the OrangeHRM login functionality using Cypress. It follows the Page Object Model (POM) design pattern to enhance test maintainability and readability.

### Key Files:
- **LoginPOM.js:** Encapsulates the login page elements and actions.
- **orangeHRM.spec.js:** Contains the test cases for verifying the login functionality.

---

## Prerequisites

1. [Node.js](https://nodejs.org/) installed.
2. [Cypress](https://www.cypress.io/) installed.
3. OrangeHRM demo environment (or a configured OrangeHRM instance).

---

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## How to Run Tests

1. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```
   Then, select the desired spec file (`orangeHRM.spec.js`).
---

## Test Cases

### Implemented Test Cases:
- Verify the user can log in with valid credentials.
- Verify the user cannot log in with invalid credentials.
- Verify login fails if the account does not exist.
- Verify login fails when username or password fields are empty.
- Verify validation for special characters and unsupported input formats.
- Verify the password field masks the entered characters.
- Verify login functionality with passwords of minimum allowable lengths.
- Verify login functionality with passwords of maximum allowable lengths.
- Verify the system treats credentials as case-sensitive.
- Verify login fails for locked accounts.
- Verify login fails for non-existing accounts.
- Verify the Remember Me feature works.
- Verify the Password Recovery feature works.
- Verify user session expires after inactivity.
- Verify the user is redirected to the login page after logging out.
- Verify the login process response time under normal conditions.
- Verify the login page is responsive across all available devices.
- Verify the login page works on all supported browsers.
- Verify the login page allows users to log in using third-party services.

---