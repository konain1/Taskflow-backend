# Taskflow Backend 🚀

This is the backend server for **Taskflow**, a web application to manage projects, tasks, and users. It is built using Node.js, Express, MongoDB (Mongoose), and Redis.

---

## 🛠️ Features
- **User Authentication**: Secure signup and login with hashed passwords (`bcrypt`) and session tokens (`JWT`).
- **Database**: Stores all user and project data in MongoDB.
- **Caching**: Configured with Redis for high performance.
- **Logging**: Uses Pino for clean console logs.
- **Robust Security**: Users can only see, edit, or delete projects/tasks they own or are members of.
- **Rate Limiting**: Protects authentication endpoints from abuse.
- **Health Check**: Endpoint to monitor backend and database health.

---

## 📂 Folder Structure
- `server.js` - Starts the server and connects to databases.
- `app.js` - Configures Express and routes.
- **`src/config/`** - Config settings for MongoDB, Redis, and logger.
- **`src/models/`** - Schema details for how data is structured in MongoDB (User, Project, Task).
- **`src/routes/`** - Defines API URL paths (endpoints).
- **`src/controllers/`** - Receives requests from routes and sends back responses.
- **`src/services/`** - Handles database logic (e.g. creating/fetching data).
- **`src/middlewares/`** - Middlewares for validation, token protection, error handling, and authorization checks.
- **`src/utils/`** - Shared utilities like JWT token generator and password hasher.

---

## 🔒 Security Rules (Who can do what?)

### Projects
- **Create Project**: Any authenticated (logged-in) user can create a project. The creator becomes the project `owner` and first `member`.
- **Fetch Projects**: Users can only get a list of projects they own or are added as members to.
- **Fetch Single Project details**: Allowed only if the user is the owner or a member of that project.
- **Update Project**: Allowed only if the user is the owner or a member of that project.
- **Delete Project**: Allowed only if the user is the project owner OR an admin.
- **Add Members**: Allowed only if the user is the project owner.

### Tasks
- **Create Task**: Allowed only if the creator is the project owner or a project member. Assigned users must also be members of the project.
- **Fetch/Read Tasks**: Allowed only if the user is the project owner or a project member.
- **Update Task**: Allowed only if the user is the project owner or a project member.
- **Delete Task**: Allowed only if the user is the project owner or a project member (generic admin who is not associated is blocked).

---

## 🔌 API Documentation (Endpoints & Payloads)

### 1. Authentication & Server Health

#### 1.1 Register User
- **Method & Route**: `POST /taskflow/api/v1/register`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "member" // Optional: 'member' or 'admin'
  }
  ```

#### 1.2 Login User
- **Method & Route**: `POST /taskflow/api/v1/login`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body (JSON)**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### 1.3 Fetch All Users
- **Method & Route**: `GET /taskflow/api/v1/users`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>` (Required)

#### 1.4 Test Auth Connection
- **Method & Route**: `GET /taskflow/api/v1/test`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>` (Required - Only for Admins)

#### 1.4 Server Health Check
- **Method & Route**: `GET /taskflow/api/v1/health`
- **Headers**: None
- **Response Example**:
  ```json
  {
    "success": true,
    "message": "health status is good",
    "database": "up"
  }
  ```

---

### 2. Project Endpoints (All require `Authorization: Bearer <token>`)

#### 2.1 Create Project
- **Method & Route**: `POST /taskflow/api/v1/create`
- **Request Body (JSON)**:
  ```json
  {
    "title": "Build Taskflow App",
    "description": "Create backend and frontend services for task management"
  }
  ```

#### 2.2 Fetch All Projects
- **Method & Route**: `GET /taskflow/api/v1/get-project`
- **Description**: Returns all projects where you are the owner or a member.

#### 2.3 Fetch Single Project Details
- **Method & Route**: `GET /taskflow/api/v1/project/:id`
- **URL Params**: `:id` (MongoDB ObjectId of the project)

#### 2.4 Update Project Details
- **Method & Route**: `PUT /taskflow/api/v1/project/:id`
- **URL Params**: `:id` (MongoDB ObjectId of the project)
- **Request Body (JSON)**:
  ```json
  {
    "title": "Updated Project Title",
    "description": "Updated Project Description"
  }
  ```

#### 2.5 Delete Project
- **Method & Route**: `DELETE /taskflow/api/v1/delete/:id`
- **URL Params**: `:id` (MongoDB ObjectId of the project)

#### 2.6 Add Member to Project
- **Method & Route**: `POST /taskflow/api/v1/project/:projectId/add-member`
- **URL Params**: `:projectId` (MongoDB ObjectId of the project)
- **Request Body (JSON)**:
  ```json
  {
    "memberId": "6a55b5ea2363687d95e89ad6" // User ID to add to members array
  }
  ```

---

### 3. Task Endpoints (All require `Authorization: Bearer <token>`)

#### 3.1 Create Task
- **Method & Route**: `POST /taskflow/api/v1/tasks`
- **Request Body (JSON)**:
  ```json
  {
    "title": "Implement JWT Auth",
    "project": "6a5656db4b954a2572986370", // Required (Project ID)
    "description": "Write jwt validation logic", // Optional
    "status": "todo", // Optional ('todo' | 'in-progress' | 'done')
    "assignee": "6a55b5ea2363687d95e89ad6", // Optional (User ID - must be project member)
    "dueDate": "2026-07-25", // Optional (YYYY-MM-DD format)
    "priority": "high" // Optional ('low' | 'medium' | 'high')
  }
  ```

#### 3.2 Fetch Project Tasks (with Search, Pagination & Filters)
- **Method & Route**: `GET /taskflow/api/v1/projects/:projectId/tasks`
- **URL Params**: `:projectId` (MongoDB ObjectId of the project)
- **Query Params (Optional)**:
  - `page` (number, default: `1`) - Target page number.
  - `limit` (number, default: `10`, max: `100`) - Number of tasks per page.
  - `search` (string) - Case-insensitive partial title search.
  - `status` (string) - Filters by: `todo`, `in-progress`, `done`.
  - `priority` (string) - Filters by: `low`, `medium`, `high`.
  - `assignee` (string) - Filters tasks assigned to a specific User ID.
  - `startDate` & `endDate` (string, `YYYY-MM-DD`) - Date range query on task `dueDate`.
- **Response Example**:
  ```json
  {
    "success": true,
    "message": "Tasks fetched successfully",
    "data": {
      "tasks": [ ... ],
      "totalTasks": 24,
      "totalPages": 3,
      "currentPage": 1,
      "limit": 10
    }
  }
  ```

#### 3.3 Update Task
- **Method & Route**: `PUT /taskflow/api/v1/tasks/:id`
- **URL Params**: `:id` (MongoDB ObjectId of the task)
- **Request Body (JSON)**:
  ```json
  {
    "status": "in-progress",
    "priority": "medium"
  }
  ```

#### 3.4 Delete Task
- **Method & Route**: `DELETE /taskflow/api/v1/tasks/:id`
- **URL Params**: `:id` (MongoDB ObjectId of the task)

---

## 🚀 How to Run Locally

### 1. Clone the Project
```bash
git clone https://github.com/konain1/Taskflow-backend.git
cd Taskflow-backend
```

### 2. Configure Environment Variables
Create a file named `.env` in the root folder and add these lines:
```env
PORT=3099
MONGODB_URI=your_mongodb_connection_uri
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Server
```bash
npm start
```
The server will connect to MongoDB and start running!

---

## 📝 License
ISC
