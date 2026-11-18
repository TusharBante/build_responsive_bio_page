# Product Management System with Role-Based Access Control (RBAC)

A full-stack Product Management System built using React.js, Node.js, Express.js, and MySQL. The application provides secure product management operations with JWT-based authentication, role-based authorization, and automated API integration testing.

## 🚀 Project Overview

This project is designed to manage products through a responsive React frontend and an Express.js backend connected to a MySQL database.

The application supports two user roles: Admin and Regular User. Admin users can perform product management operations, while Regular Users have restricted access.

The backend provides secure REST APIs with JWT authentication and middleware-based authorization.

## ✨ Features

- Responsive React user interface
- Product listing from MySQL database
- Add, update, and delete products
- REST API integration using Fetch API
- Loading spinner and error handling
- React Context API for state management
- Dark Mode and Light Mode toggle
- JWT-based user authentication
- Secure login and logout functionality
- Role-Based Access Control (RBAC)
- Admin and Regular User roles
- Protected frontend routes
- Backend authentication and authorization middleware
- Secure product management APIs
- Environment-based configuration using dotenv
- Automated API integration testing using Jest and Supertest

## 🔐 Role-Based Access Control

The application supports two user roles:

| Feature | Admin | Regular User |
|---|---|---|
| View Products | Yes | Yes |
| Add Products | Yes | No |
| Update Products | Yes | No |
| Delete Products | Yes | No |
| Access Protected Pages | Yes | Based on permissions |

**Authorization Rules:**
- JWT authentication verifies the user's identity.
- Authentication middleware validates the token.
- Authorization middleware checks the user's role.
- Only Admin users can add, update, and delete products.
- Unauthorized requests receive appropriate HTTP status codes.

## 🛠️ Technologies Used

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3
- React Context API
- React Router
- Styled Components

**Backend:**
- Node.js
- Express.js
- REST API
- JWT Authentication
- Express Middleware
- dotenv

**Database:**
- MySQL
- mysql2

**Testing:**
- Jest
- Supertest
- SQLite (optional, for isolated testing)

**Development Tools:**
- VS Code
- Git
- GitHub
- npm
- Vite

## 📂 Project Structure

```text
project/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AddProduct.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Navigation.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── database.js
│
├── tests/
│   ├── products.test.js
│   └── auth.test.js
│
├── .env
├── .env.example
├── .gitignore
├── db.js
├── init-db.js
├── server.js
├── package.json
├── package-lock.json
├── vite.config.mjs
├── index.html
└── README.md
```

*Note: The folder structure should match the actual repository implementation.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TusharBante/build_responsive_bio_page.git
```

### 2. Navigate to Project Folder

```bash
cd build_responsive_bio_page
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory.

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_management
JWT_SECRET=your_secure_secret_key
```

**Important:**
- Keep sensitive credentials inside `.env`.
- Never commit `.env` to GitHub.
- Add `.env` to `.gitignore`.
- Use `.env.example` to document required environment variables without exposing secrets.

### 5. Configure MySQL Database

- Start the MySQL server.
- Create the product management database.
- Configure database credentials.
- Run the database initialization script if required.

```bash
node init-db.js
```

### 6. Start the Backend Server

```bash
npm start
```

### 7. Start the React Development Server

```bash
npm run dev
```

Open the frontend URL displayed in the terminal.

## 🔗 API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/login` | Public | User login |
| GET | `/products` | Authenticated | Get all products |
| POST | `/products` | Admin only | Add a product |
| PUT | `/products/:id` | Admin only | Update a product |
| DELETE | `/products/:id` | Admin only | Delete a product |

### HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Product created successfully |
| 400 | Invalid request data |
| 401 | Unauthorized or missing token |
| 403 | Forbidden access |
| 404 | Resource not found |
| 500 | Internal server error |

## 🔒 Authentication and Security

The application implements JWT-based authentication and role-based authorization.

Security implementation includes:

- JWT token generation during login.
- JWT token verification middleware.
- Admin role verification.
- Protected POST, PUT, and DELETE routes.
- Environment-based JWT secret configuration.
- dotenv for secure configuration management.
- Input validation for product requests.
- Parameterized SQL queries to prevent SQL injection.
- Appropriate error handling and HTTP status codes.

## 🧪 API Integration Testing Using Jest and Supertest

The project includes an automated testing approach for validating Express REST API endpoints.

### Testing Objectives

- Test GET `/products` endpoint.
- Test POST `/products` endpoint.
- Verify product creation.
- Test invalid request scenarios.
- Test authentication and authorization.
- Validate API response status codes.

### Test Implementation Steps

**Step 1: Create Test Directory**

Create a `tests` directory in the project root.

**Step 2: Configure Jest and Supertest**

Install the testing dependencies:

```bash
npm install --save-dev jest supertest
```

**Step 3: Write Integration Tests**

Create the following test file:

```text
tests/products.test.js
```

Write test cases for GET, POST, and error scenarios of the `/products` API.

**Step 4: Test API Authentication**

Verify that:
- Requests without a valid JWT token are rejected.
- Regular users cannot modify products.
- Admin users can perform authorized operations.

**Step 5: Run Tests**

```bash
npm test
```

### Integration Test Cases

| Test Case | Expected Result |
|---|---|
| GET `/products` | 200 OK |
| POST `/products` with valid data | 201 Created |
| POST `/products` with invalid data | 400 Bad Request |
| POST `/products` without token | 401 Unauthorized |
| POST `/products` as Regular User | 403 Forbidden |
| POST `/products` as Admin | 201 Created |

### Jest Configuration

Add the following test script to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "test": "jest --runInBand"
  }
}
```

Run all integration tests using:

```bash
npm test
```

*Note: Use a separate test database or an in-memory database to isolate test data from production data.*

## 🎯 Project Objectives

- Understand full-stack web application development.
- Learn React Context API and component management.
- Implement REST API communication.
- Integrate React with MySQL through Express.js.
- Understand JWT authentication.
- Implement Role-Based Access Control.
- Develop secure backend API endpoints.
- Learn middleware-based authentication and authorization.
- Implement automated API integration testing.
- Understand Jest and Supertest testing frameworks.
- Improve backend code quality and maintainability.

## 👨‍💻 Author

**Tushar Bante**

GitHub: [@TusharBante](https://github.com/TusharBante)

Repository: [Product Management System](https://github.com/TusharBante/build_responsive_bio_page)

---

⭐ If you find this project useful, consider giving it a star!

Made with ❤️ by Tushar Bante
