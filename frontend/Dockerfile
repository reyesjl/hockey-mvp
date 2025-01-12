# frontend/Dockerfile

# Use the official Node.js image as the base image
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure environment variables are available during build
ARG BUILD_ENV
ARG VITE_NODE_ENV
ARG VITE_API_URL_DEV
ARG VITE_API_URL_PROD
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID

# Build the application (outputs to /app/dist)
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the production NGINX configuration
COPY nginx.production.conf /etc/nginx/nginx.conf
# COPY --from=build /app/frontend/nginx.${BUILD_ENV}.conf /etc/nginx/nginx.conf

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

# COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80 443

# Start the web server
CMD ["nginx", "-g", "daemon off;"]