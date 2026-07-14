const express = require('express');
const routes = require('./src/routes/auth.route');
const { notFound, centralErrorHandler } = require('./src/middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
routes(app);

// Error Handling (MUST be after all routes)
app.use(notFound);            // Catches any route that doesn't match
app.use(centralErrorHandler); // Catches any error thrown/next(err) from controllers

module.exports = app;
