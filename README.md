## ⚙️ Continuous Integration (CI) Pipeline Using GitHub Actions

This project implements a Continuous Integration (CI) pipeline using GitHub Actions to automate code quality checks, API testing, and Docker image building.

The pipeline runs automatically whenever code is pushed to the main branch or a pull request is created.

### ✨ CI Pipeline Features

- Automated code linting using ESLint
- Automated test execution using Jest
- API integration testing using Supertest
- Automatic Docker image building
- Build failure detection
- Docker image artifact storage
- GitHub Actions workflow automation
- Continuous Integration validation

### 🛠️ Technologies Used

- GitHub Actions
- Node.js
- ESLint
- Jest
- Supertest
- Docker
- Git and GitHub

### 📋 CI Pipeline Implementation Steps

**Step 1: Add ESLint for Code Linting**

Install ESLint:

```bash
npm install --save-dev eslint
```

Configure ESLint to check JavaScript code quality.

Add the following script to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

**Step 2: Add Jest Test Job**

Configure GitHub Actions to execute the automated test suite.

The workflow should:
- Install project dependencies.
- Run Jest tests.
- Execute API integration tests.
- Stop the pipeline if any test fails.

```bash
npm test
```

**Step 3: Add Docker Image Build Job**

Configure a Docker build step after successful linting and testing.

```bash
docker build -t notes-api .
```

The Docker image should only be built if the previous jobs complete successfully.

**Step 4: Store Docker Image as an Artifact or Push to Container Registry**

The generated Docker image can be:

- Saved as a GitHub Actions artifact.
- Pushed to Docker Hub.
- Published to GitHub Container Registry (GHCR).

**Step 5: Validate the Workflow**

- Push a new commit to the GitHub repository.
- Open the Actions tab.
- Check the workflow execution.
- Verify ESLint results.
- Verify Jest test results.
- Verify Docker image build status.
- Fix any errors and push another commit if required.

### 📂 GitHub Actions Workflow Structure

Create the following file:

```text
.github/
└── workflows/
    └── ci.yml
```

### 📝 Example CI Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: Notes API CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Code Linting
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

  test:
    name: Run Automated Tests
    runs-on: ubuntu-latest
    needs: lint

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Run Jest Tests
        run: npm test

  docker:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Build Docker Image
        run: docker build -t notes-api .

      - name: Save Docker Image
        run: docker save notes-api -o notes-api.tar

      - name: Upload Docker Image Artifact
        uses: actions/upload-artifact@v4
        with:
          name: notes-api-image
          path: notes-api.tar
```

### 🔄 CI Pipeline Workflow

The pipeline follows this sequence:

1. Code is pushed to GitHub.
2. GitHub Actions starts the workflow.
3. ESLint checks the code quality.
4. Jest executes automated tests.
5. Docker builds the application image.
6. The Docker image is stored as a workflow artifact.
7. The workflow reports success or failure.

### 🧪 Pipeline Validation Checklist

| Task | Expected Result |
|---|---|
| GitHub commit push | Workflow starts |
| ESLint execution | No linting errors |
| Jest execution | All tests pass |
| Docker image build | Image builds successfully |
| Artifact upload | Docker image artifact available |
| Workflow validation | All jobs successful |

### 🎯 Project Objectives

- Understand Continuous Integration.
- Automate code quality checks.
- Learn ESLint configuration.
- Automate API testing using Jest and Supertest.
- Build Docker images automatically.
- Store Docker images as workflow artifacts.
- Understand GitHub Actions workflows.
- Improve software development and deployment processes.

### 🚀 CI Pipeline Summary

**CI Platform:** GitHub Actions

**Code Linting:** ESLint

**Testing Framework:** Jest

**API Testing:** Supertest

**Containerization:** Docker

**Artifact Storage:** GitHub Actions Artifacts

**Workflow Trigger:** Push and Pull Request

**Pipeline Stages:** Lint → Test → Docker Build → Artifact Upload

---

Made with ❤️ by Tushar Bante
