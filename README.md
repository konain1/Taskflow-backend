# Taskflow Backend 🚀

Welcome to the **Taskflow Backend** repository! This is a Node.js and Express-based backend application designed for managing tasks, users, and projects. 

---

## 🛠️ Features & Integrations

- **Authentication System**: Fully secure User registration & Login (Password hashing using `bcrypt` and token generation using `JSON Web Tokens (JWT)`).
- **MongoDB (Mongoose)**: Robust object modeling for database schemas.
- **Redis (ioredis)**: High-performance caching integration.
- **Structured Logging**: Clean, formatted console logs via `pino` and `pino-pretty`.

---

## 📂 Project Organization (Simple Explanation)

At the root of the project, you will find:
- `server.js` - Starts the backend server and connects to databases.
- `app.js` - Sets up the Express app configuration and routing.

All other core code is organized inside the `src/` directory:
- **`config/`** - Setup files for databases (MongoDB & Redis) and logging.
- **`controllers/`** - Receives incoming API requests and sends back responses.
- **`models/`** - Defines how database collections look (Schemas).
- **`routes/`** - Directs API URLs to the correct controllers (e.g. `/register`).
- **`services/`** - Contains the actual business logic (e.g., verifying credentials, saving users).
- **`utils/`** - Small helper files like password hashing and JWT token generator.
- **`validators/`** - Validates the format of user input data.

---

## 🗄️ Database Schemas

1. **User Model** (`user.model.js`):
   - Stores user profiles (name, email, password, roles: `admin` or `member`).
2. **Product Model** (`product.model.js`):
   - Represents a product/project with title, owner, and members.
3. **Task Model** (`task.model.js`):
   - Represents tasks under a project. Includes title, assignee, status (`todo`, `in-progress`, `done`), priority (`low`, `medium`, `high`), and due date.

---

## 🚀 How to Run the Project Locally

Follow these simple steps to run the server on your computer:

### 1. Clone the project
```bash
git clone https://github.com/konain1/Taskflow-backend.git
cd Taskflow-backend
```

### 2. Configure Environment Variables
Create a file named `.env` in the root folder and add the following settings:
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

### 4. Start the Server
```bash
npm start
```
The server will connect to MongoDB and Redis and start listening for requests!

---

## 📝 License
ISC
