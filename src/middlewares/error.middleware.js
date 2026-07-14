const logger = require("../config/logger");

const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
};

const centralErrorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    // Mongoose: invalid ObjectId (ex: /projects/abc123)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Mongoose: duplicate key (jaise same email dobara)
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }

    // log kar do (500 ho to error, warna warn)
    if (statusCode >= 500) {
        logger.error(err, "Unhandled error");
    } else {
        logger.warn({ message }, "Handled error");
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = { notFound, centralErrorHandler };