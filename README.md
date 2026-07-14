# Taskflow Backend 🚀

This is the backend server for **Taskflow**, a simple web application to manage projects, tasks, and users. It is built using Node.js, Express, MongoDB (Mongoose), and Redis.

---

## 🛠️ Features
- **User Authentication**: Secure signup and login with hashed passwords (`bcrypt`) and session tokens (`JWT`).
- **Database**: Stores all user and project data in MongoDB.
- **Caching**: Configured with Redis for high performance.
- **Logging**: Uses Pino for clean console logs.
- **Robust Security**: Users can only see, edit, or delete projects they own or are members of.

---

## 📂 Folder Structure (In Simple Words)
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
- **Create Project**: Any authenticated (logged-in) user can create a project. The creator becomes the project `owner` and first `member`.
- **Fetch Projects**: Users can only get a list of projects they own or are added as members to.
- **Fetch Single Project details**: Allowed only if the user is the owner or a member of that project.
- **Update Project**: Allowed only if the user is the owner or a member of that project.
- **Delete Project**: Allowed only if the user is the project owner OR an admin.

---

## 🔌 API Routes (Endpoints)

### Authentication
- `POST /taskflow/api/v1/register` - Create a new user account.
- `POST /taskflow/api/v1/login` - Login to get a JWT token.
- `GET /taskflow/api/v1/test` - Test route to verify token validation.

### Projects (Requires Authorization Header: `Bearer <token>`)
- `POST /taskflow/api/v1/create` - Create a new project.
- `GET /taskflow/api/v1/get-project` - Get all projects you belong to.
- `GET /taskflow/api/v1/project/:id` - Get details of a specific project.
- `PUT /taskflow/api/v1/project/:id` - Update project details.
- `DELETE /taskflow/api/v1/delete/:id` - Delete a project.

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
