## 🔐 JWT-Based Authentication for Notes CRUD API

The Notes CRUD API is secured using JSON Web Token (JWT) authentication. Users must register and log in to access protected notes endpoints. After successful authentication, the server generates a JWT token that must be included in the Authorization header for accessing protected routes.

### ✨ Authentication Features

- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- JWT token verification
- Authentication middleware
- Protected Notes CRUD endpoints
- Secure Authorization header
- Unauthorized request handling

### 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- JSON Web Token (jsonwebtoken)
- bcrypt
- dotenv
- Postman

### 📋 JWT Implementation Steps

**Step 1: Create User Model and Registration Endpoint**

Create a users table in the MySQL database.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Implement the registration endpoint:

`POST /register`

- Accept username, email, and password.
- Validate user input.
- Hash the password using bcrypt.
- Store the user details in MySQL.
- Prevent duplicate email registration.

**Step 2: Implement Login Route and JWT Generation**

Create a login endpoint:

`POST /login`

- Accept email and password.
- Find the registered user in MySQL.
- Compare the password using bcrypt.
- Generate a JWT token after successful authentication.
- Return the token in the response.

Example JWT generation:

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);
```

**Step 3: Create JWT Authentication Middleware**

Create a middleware file named `authMiddleware.js`.

The middleware should:

- Read the Authorization header.
- Extract the Bearer token.
- Verify the JWT token.
- Reject invalid or expired tokens.
- Allow authenticated users to access protected routes.

**Step 4: Protect Notes CRUD Routes**

Apply JWT authentication middleware to all notes endpoints.

| Method | Endpoint | Access |
|---|---|---|
| POST | `/register` | Public |
| POST | `/login` | Public |
| GET | `/notes` | Authenticated |
| GET | `/notes/:id` | Authenticated |
| POST | `/notes` | Authenticated |
| PUT | `/notes/:id` | Authenticated |
| DELETE | `/notes/:id` | Authenticated |

All Notes CRUD endpoints require a valid JWT token.

**Step 5: Test Protected Routes Using Postman**

Use Postman to verify authentication and protected API functionality.

For protected endpoints, add the following header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

### 🧪 Authentication Test Cases

| Test Case | Expected Result |
|---|---|
| Register with valid details | 201 Created |
| Register with duplicate email | 409 Conflict |
| Login with valid credentials | 200 OK with JWT |
| Login with incorrect password | 401 Unauthorized |
| Access notes without token | 401 Unauthorized |
| Access notes with invalid token | 401 Unauthorized |
| Access notes with valid token | Successful response |
| Access notes with expired token | 401 Unauthorized |

### ⚙️ Environment Variables

Add the following variables to the `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_db
JWT_SECRET=your_secure_secret_key
```

**Security Guidelines:**

- Never hard-code JWT secrets.
- Store sensitive configuration in environment variables.
- Never store plain-text passwords.
- Use bcrypt password hashing.
- Validate JWT tokens on protected routes.
- Keep `.env` excluded from GitHub.

### 📂 Updated Project Structure

```text
notes-api/
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── notesRoutes.js
│
├── models/
│   └── userModel.js
│
├── db.js
├── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### 🎯 Project Objectives

- Understand JWT-based authentication.
- Implement user registration and login.
- Learn password hashing using bcrypt.
- Generate and verify JWT tokens.
- Develop authentication middleware.
- Secure REST API endpoints.
- Test protected routes using Postman.
- Understand secure backend development.

### 🚀 Authentication Summary

**Authentication Method:** JSON Web Token (JWT)

**Password Security:** bcrypt

**Database:** MySQL

**Backend:** Node.js and Express.js

**Token Expiration:** 1 Hour

**Testing Tool:** Postman

**Protected Resources:** Notes CRUD API

---

Made with ❤️ by Tushar Bante
