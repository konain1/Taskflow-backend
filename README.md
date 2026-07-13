# Taskflow Backend

Backend setup for the Taskflow assignment.

## Project Structure

The project follows a modular structure where files are divided based on their roles:

- **server.js**: The main entry point of the application. It initializes database connections and starts the Express server.
- **app.js**: Configures the Express application, middlewares, and routing.
- **src/**: Contains subfolders for clean code organization:
  - `config/`: Configuration files for databases and logger.
  - `controllers/`: Handles incoming HTTP request payloads and sends responses.
  - `middlewares/`: Custom express middleware functions.
  - `models/`: Database models and schemas.
  - `routes/`: Express route definitions.
  - `services/`: Business logic layer.
  - `utils/`: Reusable helper functions.
  - `validators/`: Input validation schemas.

## Configured Integrations

- **MongoDB (Mongoose)**: Set up to manage schema-based data.
- **Redis (ioredis)**: Configured for caching and session management.
- **Pino Logger**: Structured logging configuration for fast, clean, and readable logs.

## Database Models

- **User**: Stores user profiles (name, email, password, and roles: `admin`, `member`) with secure password hashing.
- **Product**: Represents projects/products including attributes like title, description, owner, and members.
- **Task**: Tasks under a project containing title (with search support), description, status, assignee, priority, and due date.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/konain1/Taskflow-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Taskflow-backend
   ```
3. Configure your local variables inside a `.env` file (e.g. `PORT`, `MONGODB_URI`, `REDIS_URL`).
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the server:
   ```bash
   npm start
   ```

## License

ISC
