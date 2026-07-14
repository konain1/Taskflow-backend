const express = require('express');
const Authroutes = require('./src/routes/auth.route');
const { notFound, centralErrorHandler } = require('./src/middlewares/error.middleware');
const projectRoutes = require('./src/routes/project.route')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
Authroutes(app);
projectRoutes(app);



app.use(notFound);           
app.use(centralErrorHandler); 

module.exports = app;
