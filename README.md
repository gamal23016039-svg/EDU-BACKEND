# Educational Platform Backend

A RESTful backend API for an educational platform, built with Node.js, Express.js, and MongoDB. The project provides APIs for user authentication, course and lesson management, assignments, submissions, student enrollment, progress tracking, and dashboards.

## 🚀 Features

- **Authentication:** User registration, login, JWT-based authentication, and email verification using OTP.
- **Role-Based Access Control (RBAC):** Restrict access to protected resources based on user roles.
- **Course Management:** API routes for managing courses.
- **Lesson Management:** API routes for managing educational lessons.
- **Assignment Management:** Support for assignment-related operations.
- **Submission Management:** Dedicated routes for assignment submissions.
- **Enrollment Management:** Handle student enrollment and enrollment codes.
- **Progress Tracking:** APIs for tracking student learning progress.
- **Dashboard APIs:** Dedicated endpoints for dashboard-related operations.
- **File Serving:** Serve uploaded files through a dedicated static route.
- **Security Middleware:** Helmet, HPP, and CORS configuration.
- **Docker Support:** Containerized application setup.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Helmet | HTTP security headers |
| HPP | HTTP parameter pollution protection |
| CORS | Cross-origin resource sharing |
| Docker | Application containerization |

## 📁 API Modules

The application organizes its API routes into separate modules.

| Module | Base Route |
|---|---|
| Authentication | `/api/auth` |
| Users | `/api/users` |
| Courses | `/api/cource` |
| Lessons | `/api/lesson` |
| Assignments | `/api/assignment` |
| Dashboards | `/api/dashboard` |
| Enrollments | `/api/enrollments` |
| Progress | `/api/progress` |
| Submissions | `/api/submission` |
| Enrollment Codes | `/api/codes` |
| Uploaded Files | `/uploads` |

**Note:** The course route is currently named `/api/cource` in the application. The API documentation reflects the existing implementation.

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas database
- Git
- Docker, if you want to use the containerized setup

### 1. Clone the Repository

```bash
git clone https://github.com/gamal23016039-svg/EDU-BACKEND.git
cd EDU-BACKEND
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=3000
DATABASE=mongodb://127.0.0.1:27017/educational-platform
```

Replace the database connection string with your MongoDB Atlas URI if you use a cloud database.

**Important:** Configure any additional environment variables required by the authentication, email verification, and Docker configurations in your project. Never commit real credentials, database passwords, or JWT secrets to GitHub.

### 4. Start the Application

Run the start command defined in your `package.json`. For example, if the project uses a `start` script:

```bash
npm start
```

The server listens on the port configured through the `PORT` environment variable.

When the database connection succeeds, the application logs a database connection message.

### 5. Test the API

Use Postman or another API client to test the available endpoints.

The default CORS configuration currently allows requests from:

```text
http://localhost:5173
```

If your frontend runs on another origin, update the CORS configuration accordingly.

## 🐳 Docker

The project includes Docker support for running the application in a containerized environment.

Check the repository for the available `Dockerfile` and/or `docker-compose.yml` before choosing the appropriate Docker commands. Database connection settings may need to differ between local development and containerized execution.

## 🔐 Security Considerations

- Passwords should be stored as hashes, never as plain text.
- Protected endpoints should verify JWTs before granting access.
- Role-based authorization should be applied to restricted resources.
- Environment variables should be used for sensitive configuration.
- CORS should allow only trusted frontend origins in production.
- Uploaded files should be validated and protected according to their intended access rules.

## 🎯 Project Goals

This project was built to apply practical backend development concepts, including:

- Designing and organizing REST APIs.
- Working with MongoDB and Mongoose.
- Implementing authentication and authorization.
- Structuring an application into feature-based route modules.
- Applying security middleware.
- Working with Docker for application containerization.

## 👨‍💻 Author

**Gamal Abdelnaser Thabet**

Backend Developer | Node.js & Express.js

- GitHub: [gamal23016039-svg](https://github.com/gamal23016039-svg)

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to publish the project under an open-source license.
