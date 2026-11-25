## ⚛️ React Frontend with Redux Toolkit – Notes Management

A React-based frontend application integrated with the secured Notes REST API using Redux Toolkit. The application allows authenticated users to create, view, update, and delete notes through asynchronous API requests.

Redux Toolkit is used for centralized state management and synchronization between the React frontend and Express.js backend.

### ✨ Features

- React-based user interface
- Redux Toolkit for state management
- Centralized Redux store
- Notes management using Redux Slice
- Async Thunks for API operations
- Fetch all notes
- Add new notes
- Update existing notes
- Delete notes
- JWT-based authentication
- Secure API requests using Authorization headers
- Authentication token storage
- Loading and error state handling
- Backend and frontend data synchronization
- Responsive notes management interface

### 🛠️ Technologies Used

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3

**State Management:**
- Redux Toolkit
- React Redux
- Redux Slice
- createAsyncThunk

**Backend:**
- Node.js
- Express.js
- REST API
- JWT Authentication

**Database:**
- MySQL
- mysql2

**API Integration:**
- Fetch API or Axios
- Authorization Headers
- JSON

### 📋 Implementation Steps

**Step 1: Set Up Redux Store with Notes Slice**

Install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux
```

Create a Redux store to manage application state.

Create a notes slice to maintain:
- Notes list
- Loading status
- Error messages
- Selected note

Example project structure:

```text
src/
│
├── app/
│   └── store.js
│
├── features/
│   └── notes/
│       └── notesSlice.js
│
├── components/
│   ├── NotesList.jsx
│   ├── AddNote.jsx
│   └── EditNote.jsx
│
├── App.jsx
└── main.jsx
```

**Step 2: Create Async Thunks for Notes API Operations**

Use Redux Toolkit's `createAsyncThunk` to perform asynchronous API requests.

Implement the following operations:

- Fetch Notes – GET `/notes`
- Add Note – POST `/notes`
- Update Note – PUT `/notes/:id`
- Delete Note – DELETE `/notes/:id`

Handle the following states:
- Pending – API request is in progress.
- Fulfilled – API request completed successfully.
- Rejected – API request failed.

**Step 3: Design React Components for Notes Management**

Create React components for:

- Notes List – Display all available notes.
- Add Note – Form to create a new note.
- Edit Note – Update existing note details.
- Delete Note – Remove a note.
- Authentication – Handle user login and token access.

Use React components and Redux selectors to display and manage notes.

**Step 4: Handle Authentication Token Storage**

After successful login, store the JWT token using an appropriate browser storage mechanism.

Include the JWT token in API requests through the Authorization header.

Example:

```javascript
const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:3000/notes",
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
);
```

**Security Note:** Never store sensitive information such as passwords in browser storage. Clear the authentication token during logout and handle expired tokens appropriately.

**Step 5: Test the UI and Backend Synchronization**

Verify that all frontend operations work correctly with the secured backend API.

Testing checklist:

- Login and obtain JWT token.
- Fetch notes from the backend.
- Add a new note.
- Update an existing note.
- Delete a note.
- Verify Redux state updates after API operations.
- Test API requests without authentication.
- Handle loading and error states.
- Verify that backend data and frontend state remain synchronized.

### 🔗 API Integration

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Fetch Notes | GET | `/notes` |
| Add Note | POST | `/notes` |
| Update Note | PUT | `/notes/:id` |
| Delete Note | DELETE | `/notes/:id` |

All Notes API requests require a valid JWT authentication token.

### 🧪 Testing Checklist

| Test Case | Expected Result |
|---|---|
| Fetch notes | Notes displayed in UI |
| Add note | New note appears in list |
| Update note | Updated details displayed |
| Delete note | Note removed from list |
| API request without token | 401 Unauthorized |
| Invalid token | 401 Unauthorized |
| API loading | Loading indicator displayed |
| API error | Error message displayed |

### 🎯 Project Objectives

- Understand React Redux architecture.
- Implement centralized state management.
- Learn Redux Toolkit and Redux Slice.
- Use createAsyncThunk for asynchronous operations.
- Integrate React with REST APIs.
- Implement JWT-based API authentication.
- Manage authentication tokens.
- Synchronize frontend and backend data.
- Handle API loading and error states.
- Build a secure Notes Management interface.

### 🚀 Integration Summary

**Frontend:** React.js

**State Management:** Redux Toolkit

**Redux Middleware:** createAsyncThunk

**Backend:** Node.js and Express.js

**Database:** MySQL

**Authentication:** JWT

**API Integration:** Fetch API / Axios

**API Operations:** GET, POST, PUT, DELETE

**Testing Tool:** Postman

---

Made with ❤️ by Tushar Bante
