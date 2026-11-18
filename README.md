# Product Management System with Role-Based Access Control (RBAC)

A full-stack Product Management Application built using React, Node.js, Express.js, and MySQL. The application includes JWT-based authentication and role-based access control to manage product operations securely.

## 🚀 Project Overview

This project is designed to manage products through a responsive React frontend and an Express.js backend connected to a MySQL database.

It supports user authentication and different access permissions for Admin and Regular Users.

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
- Protected routes
- Backend authentication and authorization middleware
- Product management permissions
- Integration testing using Jest and Supertest

## 🔐 Role-Based Access Control

The application supports two user roles:

| Feature | Admin | Regular User |
|---|---|---|
| View Products | Yes | Yes |
| Add Products | Yes | No |
| Update Products | Yes | No |
| Delete Products | Yes | No |
| Access Protected Pages | Yes | Based on permissions |

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

**Database:**
- MySQL
- mysql2

**Testing:**
- Jest
- Supertest
- SQLite (optional test database)

**Development Tools:**
- VS Code
- Git
- GitHub
- npm
- Vite

## 📂 Project Structure

```text
build_responsive_bio_page/
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
├── tests/
│   └── products.test.js
│
├── db.js
├── init-db.js
├── server.js
├── package.json
├── package-lock.json
├── vite.config.mjs
├── index.html
└── README.md
```

*Note: Adjust the folder structure according to the actual files in your repository.*

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

### 4. Configure MySQL Database

- Create a MySQL database.
- Configure database credentials in environment variables or the database configuration file.
- Run the database initialization script if required.

### 5. Start the Backend Server

```bash
npm start
```

### 6. Start the React Development Server

```bash
npm run dev
```

Open the frontend URL displayed in the terminal.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | User login |
| GET | `/products` | Get all products |
| POST | `/products` | Add a new product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

**Note:** Product modification endpoints require valid authentication and Admin authorization.

## 🧪 Integration Testing Using Jest and Supertest

This project includes an integration testing approach for the Express `/products` API using Jest and Supertest.

### Testing Objectives

- Test GET and POST requests.
- Verify API responses.
- Test error scenarios.
- Ensure API functionality works correctly.

### Task Implementation Steps

**Step 1: Set Up Test Database**

- Create a separate test database.
- Alternatively, use an in-memory SQLite database for testing.
- Keep test data separate from production data.

**Step 2: Write API Integration Tests**

Create a test file named `products.test.js`.

Write tests for:

- GET `/products` – Verify product listing.
- POST `/products` – Verify product creation.
- Error scenarios – Test invalid requests and server errors.

**Step 3: Run Tests Using Jest**

```bash
npx jest
```

Ensure all test cases pass successfully.

**Step 4: Add npm Test Script**

Add the following script inside `package.json`:

```json
"scripts": {
  "test": "jest --runInBand"
}
```

Run the test suite using:

```bash
npm test
```

**Step 5: Document Test Execution**

Document the testing setup, commands, test cases, and expected results in this README file.

### Example Test Cases

| Test Case | Expected Result |
|---|---|
| GET `/products` | Returns product list |
| POST `/products` | Creates a new product |
| Invalid POST request | Returns validation error |
| Invalid API request | Returns appropriate error response |

*Note: These are planned test cases. Actual results depend on the implemented test suite.*

## 🔒 Security

- JWT-based authentication
- Token verification middleware
- Role-based authorization
- Protected API endpoints
- Input validation
- Parameterized SQL queries to prevent SQL injection

## 🎯 Project Objectives

- Understand full-stack web application development.
- Learn React Context API and component management.
- Implement REST API communication.
- Integrate React with MySQL through Express.js.
- Understand JWT authentication.
- Implement Role-Based Access Control.
- Learn secure backend API development.
- Understand API integration testing using Jest and Supertest.
- Test GET, POST, and error scenarios.

## 👨‍💻 Author

**Tushar Bante**

GitHub: [@TusharBante](https://github.com/TusharBante)

Repository: [build_responsive_bio_page](https://github.com/TusharBante/build_responsive_bio_page)

---

⭐ If you find this project useful, consider giving it a star!

Made with ❤️ by Tushar Bante
