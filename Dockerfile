# Use an official, stable Node.js runtime as the parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose port 3000 used by the Express.js server
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Define command to run the Express application
CMD ["npm", "start"]
