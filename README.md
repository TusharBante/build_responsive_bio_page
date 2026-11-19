## 🚀 Deployment on Render

The Product Management System can be deployed on Render as a full-stack application with a Node.js and Express backend and a React frontend.

### Deployment Implementation Steps

**Step 1: Push Code to GitHub**

- Create a GitHub repository.
- Push the complete project source code to GitHub.
- Ensure that the repository contains the frontend, backend, and package.json files.
- Connect the GitHub repository to Render.

```bash
git add .
git commit -m "Prepare project for Render deployment"
git push origin main
```

**Step 2: Create a Web Service on Render**

- Visit [Render](https://render.com/).
- Sign in to your Render account.
- Click on New and select Web Service.
- Connect your GitHub repository.
- Select the Product Management System repository.
- Configure the service for the Node.js backend.

**Step 3: Configure Environment Variables**

Open the Environment section in the Render dashboard and add the required environment variables.

```env
NODE_ENV=production
PORT=5000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_secure_jwt_secret
```

**Important:**
- Use valid production database credentials.
- Keep the JWT secret secure.
- Never upload `.env` files or database passwords to GitHub.
- Use a cloud-accessible MySQL database.

**Step 4: Configure Build and Start Commands**

Configure the following commands in Render:

| Configuration | Command |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `node server.js` |

Make sure the backend server listens on the port provided by `process.env.PORT`.

**Step 5: Deploy the Application**

- Click Create Web Service.
- Render will install dependencies and build the application.
- The backend server will start automatically.
- Wait until the deployment status shows Live.
- Copy the generated Render URL.

**Step 6: Test Live Application**

Verify the deployed application using the Render URL.

Testing checklist:

- Open the live application URL.
- Verify that the React frontend loads successfully.
- Test the GET `/products` API endpoint.
- Test the POST `/products` API endpoint with valid authentication.
- Verify JWT authentication and Admin authorization.
- Test invalid requests and error responses.
- Check the Render deployment logs for errors.

### Deployment Verification

| Test | Expected Result |
|---|---|
| Live application URL | React UI loads successfully |
| GET `/products` | Product list is returned |
| POST `/products` | Product is created successfully with Admin authorization |
| Invalid JWT token | 401 Unauthorized |
| Regular User modifying products | 403 Forbidden |
| Deployment status | Live |

### Deployment Platform

**Platform:** Render

**Service Type:** Web Service

**Source Code:** GitHub

**Backend:** Node.js and Express.js

**Frontend:** React.js

**Database:** MySQL

**Build Command:** `npm install && npm run build`

**Start Command:** `node server.js`

*Note: Deployment is complete only after the live frontend and backend API have been tested successfully.*
