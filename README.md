# Task Manager - MERN Application

A full-stack task management application built with **MongoDB**, **Express**, **React**, and **Node.js**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Authentication Flow](#authentication-flow)

## ✨ Features

- **User Authentication**: Register, login, and logout with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Protected Routes**: Only authenticated users can access their tasks
- **Persistent Sessions**: Automatic login using localStorage
- **Toast Notifications**: Real-time feedback on user actions
- **Responsive Design**: Works on desktop and mobile devices
- **Unit Testing**: Jest tests for React components

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool
- **Redux Toolkit 2.10.1** - State management
- **React Router 7.9.5** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **React Toastify 11.0.5** - Notifications
- **React Icons 5.5.0** - Icon library
- **Jest 30.2.0** - Testing framework
- **Babel 7.28.5** - JavaScript transpiler

### Backend

- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 3.0.2** - Password hashing
- **Dotenv 17.2.3** - Environment variables
- **Nodemon 3.1.10** - Auto-restart during development

## 📁 Project Structure

```
task_MERN/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js              # Redux store configuration
│   │   ├── components/               # React components
│   │   │   ├── dashboard.jsx
│   │   │   ├── header.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── protectedRoute.jsx
│   │   │   ├── taskform.jsx
│   │   │   ├── taskitem.jsx
│   │   │   ├── tasklist.jsx
│   │   │   ├── spinner.jsx
│   │   │   └── spinner.test.js
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── authService.js
│   │   │   │   └── authSlice.js
│   │   │   └── task/
│   │   │       ├── taskService.js
│   │   │       └── taskSlice.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── setupTests.js
│   │   └── index.css
│   ├── jest.config.js
│   ├── babel.config.js
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── connect/
    │   └── database.js               # MongoDB connection
    ├── controllers/
    │   ├── userController.js         # User logic
    │   └── taskController.js         # Task logic
    ├── middleware/
    │   ├── authMiddleware.js         # JWT verification
    │   └── errorMiddleware.js        # Error handling
    ├── models/
    │   ├── userModel.js              # User schema
    │   └── taskModel.js              # Task schema
    ├── routes/
    │   ├── userRoutes.js             # User endpoints
    │   └── taskRoutes.js             # Task endpoints
    ├── server.js                     # Express app setup
    ├── .env                          # Environment variables
    └── package.json
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account or local MongoDB installed
- **npm** or **yarn**

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the backend directory with your configuration:

```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskApp
JWT_SECRET=your_secret_key_here
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. The frontend will automatically proxy API requests to `http://localhost:8000` (configured in `vite.config.js`)

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev    # runs with nodemon for automatic reload during development
```

Server will run on `http://localhost:8000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### Build for Production

**Frontend:**

```bash
cd frontend
npm run build
```

**Backend:**
No build step required, just run:

```bash
cd backend
npm start
```

### Run Tests

**Frontend Tests:**

```bash
cd frontend
npm test
```

**Linter:**

```bash
cd frontend
npm run lint
```

## 📡 API Endpoints

### User Endpoints

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| POST   | `/api/users`         | Register new user     | ❌            |
| POST   | `/api/users/login`   | Login user            | ❌            |
| GET    | `/api/users/current` | Get current user info | ✅            |

**Request/Response Examples:**

**Register:**

```json
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**

```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints

| Method | Endpoint         | Description            | Auth Required |
| ------ | ---------------- | ---------------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks for user | ✅            |
| POST   | `/api/tasks`     | Create new task        | ✅            |
| PUT    | `/api/tasks/:id` | Update task            | ✅            |
| DELETE | `/api/tasks/:id` | Delete task            | ✅            |

**Request/Response Examples:**

**Create Task:**

```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Buy groceries"
}
```

**Update Task:**

```json
PUT /api/tasks/12345
Authorization: Bearer <token>
{
  "title": "Buy groceries and cook dinner"
}
```

**Delete Task:**

```
DELETE /api/tasks/12345
Authorization: Bearer <token>
```

## 💡 Usage

### User Registration & Login

1. Visit `http://localhost:5173/register`
2. Create account with name, email, and password
3. Login at `http://localhost:5173/login` with your credentials
4. JWT token is automatically stored in localStorage for persistent sessions

### Task Management

1. After login, you'll be redirected to **Dashboard** (`/`)
2. Click **"Check Tasks"** to view all your tasks (`/tasklist`)
3. **Create Task**:
   - Enter task description in the form
   - Click "Add tasks" button
4. **Edit Task**:
   - Click "Edit" button on task card
   - Modify task text
   - Click "Save" button
5. **Delete Task**:
   - Click "×" button on task card to remove it
6. **Logout**:
   - Click logout button in header to end session

### Key Components

- **Dashboard** (`dashboard.jsx`): Main landing page after login
- **Task List** (`tasklist.jsx`): Display all user tasks
- **Task Item** (`taskitem.jsx`): Individual task display with edit/delete buttons
- **Task Form** (`taskform.jsx`): Form for creating/updating tasks
- **Protected Route** (`protectedRoute.jsx`): Guards routes that require authentication
- **Login/Register** (`login.jsx`, `register.jsx`): Authentication pages
- **Header** (`header.jsx`): Navigation and logout
- **Spinner** (`spinner.jsx`): Loading indicator

## 🔐 Authentication Flow

1. **Registration**: User submits form → Password is hashed with bcryptjs → User saved to MongoDB
2. **Login**:
   - User credentials validated
   - JWT token generated with user ID
   - Token stored in localStorage
3. **Authenticated Requests**:
   - Token included in `Authorization: Bearer <token>` header
   - Backend `authMiddleware.js` verifies token
   - User ID extracted from token for filtering tasks
4. **Protected Routes**:
   - `protectedRoute.jsx` checks if user is authenticated
   - Redirects to login if token is missing or invalid
5. **Logout**: User cleared from Redux state, localStorage token removed

### Security Features

- Passwords hashed using bcryptjs (10 salt rounds)
- JWT tokens with expiration (configurable in backend)
- Protected API routes require valid JWT
- Protected React routes prevent unauthorized access
- Error middleware handles authentication errors

## 📦 State Management (Redux)

### Auth Slice (`features/auth/authSlice.js`)

- `user`: Current authenticated user
- `token`: JWT token
- `isLoading`: Loading state during auth operations
- `isError`: Error state
- `isSuccess`: Success state
- `message`: Status message

### Task Slice (`features/task/taskSlice.js`)

- `tasks`: Array of user tasks
- `isLoading`: Loading state
- `isError`: Error state
- `isSuccess`: Success state
- `message`: Status message

## 🧪 Testing

Unit tests are configured using **Jest** and **React Testing Library**.

**Test Configuration:**

- `jest.config.js`: Jest configuration with jsdom environment
- `babel.config.js`: Babel configuration for transforming JSX and ES6
- `setupTests.js`: Global setup for polyfills and MSW (Mock Service Worker)

**Run Tests:**

```bash
npm test
```

**Example Test:**

```javascript
// spinner.test.js
import { render, screen } from "@testing-library/react";
import Spinner from "./spinner";

describe("Spinner", () => {
  test("renders correctly", () => {
    render(<Spinner />);
    const containerDiv = screen.getByTestId("spin-container");
    expect(containerDiv).toBeInTheDocument();
  });
});
```

## 🚨 Troubleshooting

### Backend Issues

**Cannot connect to MongoDB:**

- Verify MONGO_URI in `.env` is correct
- Check network access in MongoDB Atlas
- Ensure MongoDB is running if using local instance

**Port 8000 already in use:**

- Change PORT in `.env` to another port (e.g., 8001)
- Or kill the process using port 8000

### Frontend Issues

**Cannot connect to backend API:**

- Ensure backend server is running on port 8000
- Check that proxy URL in `vite.config.js` is correct
- Verify CORS headers on backend (if configured)

**Tests failing:**

- Run `npm cache clean --force` then reinstall node_modules
- Ensure all devDependencies are installed
- Check that `setupTests.js` is properly configured

## 📝 Environment Variables

### Backend `.env`

```env
NODE_ENV=development              # development or production
PORT=8000                         # API server port
MONGO_URI=mongodb+srv://...       # MongoDB connection string
JWT_SECRET=your_secret_key_here   # Secret key for JWT signing
JWT_EXPIRE=7d                     # JWT token expiration (optional)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the **ISC License**.

---

**Happy Coding! 🚀**
