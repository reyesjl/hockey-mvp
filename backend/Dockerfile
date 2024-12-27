# backend/Dockerfile

# Use official Node.js imnage as the base image
FROM node:22

# Set the working directory

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure environment variables are available during build
ARG DB_URI

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
