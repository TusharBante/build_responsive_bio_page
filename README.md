## 🧪 Automated Testing for Notes CRUD API

The Notes CRUD API includes an automated testing approach using Jest and Supertest to verify API functionality, HTTP status codes, response data, and error handling.

The test suite covers all CRUD endpoints to ensure the API works correctly and reliably.

### ✨ Testing Features

- Automated API testing using Jest
- HTTP assertions using Supertest
- Database mocking or separate test database
- GET, POST, PUT, and DELETE endpoint testing
- HTTP status code verification
- API response validation
- Error handling tests
- Test coverage reports
- Continuous Integration (CI) workflow preparation

### 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- Jest
- Supertest
- JavaScript
- npm
- GitHub Actions (CI)

### 📋 Testing Implementation Steps

**Step 1: Configure Jest and Supertest**

Install the required testing dependencies:

```bash
npm install --save-dev jest supertest
```

Configure Jest in `package.json`:

```json
{
  "scripts": {
    "test": "jest --runInBand",
    "test:coverage": "jest --coverage --runInBand"
  }
}
```

**Step 2: Mock Database Interactions or Use a Test Database**

Configure a separate testing database to avoid modifying production data.

Testing setup should include:

- Separate test database configuration.
- Database connection management.
- Test data initialization.
- Database cleanup after tests.
- Mock database queries when required.

**Step 3: Write Tests for All CRUD Endpoints**

Create a test directory:

```text
tests/
├── notes.test.js
├── auth.test.js
└── setup.js
```

Write integration tests for the following API endpoints:

| Method | Endpoint | Test Description |
|---|---|---|
| GET | `/notes` | Retrieve all notes |
| GET | `/notes/:id` | Retrieve a specific note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update an existing note |
| DELETE | `/notes/:id` | Delete a note |

Verify the following:
- Correct HTTP status codes.
- Expected JSON response.
- Successful CRUD operations.
- Invalid request handling.
- Authentication requirements.
- Database error handling.

**Step 4: Run Tests and Generate Coverage Report**

Run the complete test suite:

```bash
npm test
```

Generate a test coverage report:

```bash
npm run test:coverage
```

Jest generates a coverage report showing:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

The coverage report helps identify untested parts of the application.

**Step 5: Integrate Testing into CI Workflow**

Prepare a Continuous Integration workflow using GitHub Actions.

Create the following file:

```text
.github/workflows/test.yml
```

Example workflow:

```yaml
name: Notes API Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test
```

*Note: Configure the required test database or mocks and environment variables before running the CI workflow.*

### 🧪 API Test Cases

| Test Case | Expected Result |
|---|---|
| GET all notes | 200 OK |
| GET note by valid ID | 200 OK |
| GET note with invalid ID | 404 Not Found |
| POST valid note | 201 Created |
| POST invalid note | 400 Bad Request |
| PUT existing note | 200 OK |
| PUT non-existing note | 404 Not Found |
| DELETE existing note | 200 OK |
| DELETE non-existing note | 404 Not Found |
| Request without JWT | 401 Unauthorized |
| Request with invalid JWT | 401 Unauthorized |

### 📊 Test Coverage

Test coverage is used to measure how much of the application code is executed during automated testing.

The coverage report includes:

- Statements
- Branches
- Functions
- Lines

Run the following command to generate the report:

```bash
npm run test:coverage
```

The generated coverage report is available in the `coverage/` directory.

### 🎯 Project Objectives

- Understand automated API testing.
- Learn Jest testing framework.
- Perform HTTP assertions using Supertest.
- Test all CRUD operations.
- Validate API responses and status codes.
- Test error handling and authentication.
- Understand database mocking and test databases.
- Generate test coverage reports.
- Learn Continuous Integration using GitHub Actions.
- Improve application reliability and code quality.

### 🚀 Testing Summary

**Testing Framework:** Jest

**HTTP Testing Library:** Supertest

**Backend:** Node.js and Express.js

**Database:** MySQL

**Testing Type:** API Integration Testing

**Coverage Tool:** Jest Coverage

**CI Platform:** GitHub Actions

**Test Commands:**

```bash
npm test
npm run test:coverage
```

---

Made with ❤️ by Tushar Bante
