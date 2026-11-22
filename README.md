## 🐳 Docker Containerization

The Express.js CRUD API is containerized using Docker to provide a consistent and portable application environment.

### ✨ Docker Features

- Containerize the Express.js application.
- Create a Docker image using Dockerfile.
- Use `.dockerignore` to exclude unnecessary files.
- Run the application inside a Docker container.
- Map container ports to the local machine.
- Test API endpoints inside the running container.

### 🛠️ Technologies Used

- Node.js
- Express.js
- Docker
- REST API
- JavaScript

### 📋 Docker Implementation Steps

**Step 1: Create a Dockerfile**

Create a file named `Dockerfile` in the project root directory.

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**Step 2: Create a .dockerignore File**

Create a `.dockerignore` file to exclude unnecessary files from the Docker image.

```text
node_modules
npm-debug.log
.git
.env
.gitignore
```

**Step 3: Build the Docker Image**

Open the terminal in the project directory and execute:

```bash
docker build -t notes-api .
```

This command creates a Docker image named `notes-api`.

**Step 4: Run the Docker Container**

Execute the following command:

```bash
docker run -p 3000:3000 notes-api
```

This command starts the container and maps port 3000 of the host machine to port 3000 inside the container.

**Step 5: Test API Endpoints**

Open Postman or use a browser to test the running API.

Base URL:

```text
http://localhost:3000
```

Test the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve all products |
| POST | `/products` | Create a new product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

Verify that the API returns the expected responses from inside the running Docker container.

### 🔧 Useful Docker Commands

| Command | Description |
|---|---|
| `docker --version` | Check Docker version |
| `docker build -t notes-api .` | Build Docker image |
| `docker images` | List Docker images |
| `docker run -p 3000:3000 notes-api` | Run container |
| `docker ps` | View running containers |
| `docker stop <container_id>` | Stop container |
| `docker logs <container_id>` | View container logs |

### 🎯 Project Objectives

- Understand Docker containerization.
- Learn how to create a Dockerfile.
- Understand Docker image creation.
- Run Express.js applications inside containers.
- Learn port mapping.
- Test REST API endpoints inside Docker containers.
- Understand application portability and deployment.

### 🚀 Docker Deployment Summary

**Application:** Express.js CRUD API

**Containerization Tool:** Docker

**Base Image:** Node.js 22

**Docker Image Name:** notes-api

**Container Port:** 3000

**Host Port:** 3000

**API Testing:** Postman / Browser

*Note: The Express application must listen on port 3000 for this configuration.
