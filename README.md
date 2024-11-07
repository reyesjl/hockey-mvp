# Hockey Tournament Review Platform

This repository contains the code for the **Hockey Tournament Review Platform**, a web application designed to provide a user-driven review system for hockey tournaments. Users can submit new tournaments, review them, and explore nearby amenities such as hotels, rinks, and entertainment venues.

## Table of Contents

- [Hockey Tournament Review Platform](#hockey-tournament-review-platform)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **User Registration and Authentication**
- **Tournament Submission and Admin Approval**
- **Review and Rating System for Tournaments**
- **Nearby Venues (Hotels, Rinks, Entertainment) Integration**
- **Admin Dashboard for Content Moderation**
- **Mobile-Responsive UI**

## Tech Stack

- **Frontend**: Vue.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Deployment**: TBD

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or use a MongoDB Atlas cluster)
- **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hockey-tournament-review.git
   cd hockey-tournament-review

2. Install dependencies for the backend and frontend
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install

3. Setup environment variables
    ```bash
    Create a .env in the backend folder with the following:
    PORT=5000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret

4. Start the development servers
    ```bash
    # In the backend directory
    npm run dev

    # In the frontend directory
    npm run serve

The backend server will run on http://localhost:5000 and the frontend server will run on http://localhost:8080.

## Project Structure
    hockey-tournament-review/
    ├── backend/               # Express.js API server
    │   ├── config/            # Configuration files (e.g., database)
    │   ├── controllers/       # API route controllers
    │   ├── models/            # Mongoose models
    │   ├── routes/            # API routes
    │   └── server.js          # Main server file
    ├── frontend/              # Vue.js frontend application
    │   ├── src/
    │   │   ├── assets/        # Static assets
    │   │   ├── components/    # Reusable Vue components
    │   │   ├── views/         # Application views/pages
    │   │   └── App.vue        # Main application component
    │   └── public/            # Public files
    └── README.md

## Usage
- User: Register an account to submit and review tournaments.
- Admin: Approve/deny tournament submissions and manage flagged content through the admin dashboard.

## API Documentation
Refer to the API documentation for details on available endpoints and request/response structures.

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit (git commit -m 'Add new feature').
4. Push to your branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License.


