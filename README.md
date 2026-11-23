## 📝 Notes CRUD API with MySQL

A RESTful Notes Management API built using Node.js, Express.js, and MySQL. This application provides complete CRUD (Create, Read, Update, Delete) operations to manage notes with database connectivity, input validation, and error handling.

### ✨ Features

- Express.js REST API
- MySQL database integration
- Create new notes
- Retrieve all notes
- Retrieve individual notes
- Update existing notes
- Delete notes
- Input validation
- Error handling
- Parameterized SQL queries
- JSON request and response handling

### 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- JavaScript
- REST API
- Postman

### 📋 Implementation Steps

**Step 1: Initialize Express Project and Install MySQL Driver**

Create a new project directory and initialize Node.js.

```bash
mkdir notes-api
cd notes-api
npm init -y
```

Install the required dependencies:

```bash
npm install express mysql2 dotenv
npm install --save-dev nodemon
```

**Step 2: Design Notes Table Schema and Run Migrations**

Create a MySQL database named `notes_db`.

Create the notes table using the following SQL query:

```sql
CREATE DATABASE notes_db;

USE notes_db;

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Create a database connection file named `db.js`.

Configure database credentials using environment variables.

**Step 3: Implement CRUD API Routes**

Implement the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notes` | Retrieve all notes |
| GET | `/notes/:id` | Retrieve a specific note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update an existing note |
| DELETE | `/notes/:id` | Delete a note |

**Step 4: Add Error Handling and Input Validation**

- Validate note title and content.
- Ensure required fields are provided.
- Check whether a note exists before updating or deleting.
- Handle invalid IDs.
- Handle database connection errors.
- Return appropriate HTTP status codes.
- Use parameterized SQL queries to prevent SQL injection.

**Step 5: Test API Using Postman**

Start the Express server:

```bash
node server.js
```

Base URL:

```text
http://localhost:3000
```

Test the following operations using Postman:

| Operation | Method | Endpoint | Expected Result |
|---|---|---|---|
| Create Note | POST | `/notes` | 201 Created |
| Get All Notes | GET | `/notes` | 200 OK |
| Get Note by ID | GET | `/notes/1` | 200 OK |
| Update Note | PUT | `/notes/1` | 200 OK |
| Delete Note | DELETE | `/notes/1` | 200 OK |

### 📂 Project Structure

```text
notes-api/
│
├── db.js
├── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### ⚙️ Environment Configuration

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notes_db
```

Keep database credentials private and exclude `.env` from GitHub.

### 🎯 Project Objectives

- Understand Node.js and Express.js development.
- Learn MySQL database connectivity.
- Design and implement database schemas.
- Perform CRUD operations using REST APIs.
- Implement input validation and error handling.
- Understand HTTP methods and status codes.
- Test REST API endpoints using Postman.
- Learn secure database query handling.

### 🚀 API Summary

**Project Name:** Notes CRUD API

**Backend:** Node.js and Express.js

**Database:** MySQL

**Database Driver:** mysql2

**API Architecture:** REST

**Testing Tool:** Postman

**Port:** 3000

---

Made with ❤️ by Tushar Bante
