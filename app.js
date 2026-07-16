const express = require('express');
const cors = require('cors');
const Authroutes = require('./src/routes/auth.route');
const projectRoutes = require('./src/routes/project.route');
const taskRoutes = require('./src/routes/task.route');
const healthRoutes = require('./src/routes/health.route');
const { notFound, centralErrorHandler } = require('./src/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
Authroutes(app);
projectRoutes(app);
taskRoutes(app);
healthRoutes(app);

app.use(notFound);           
app.use(centralErrorHandler); 

module.exports = app;
