/**
 * Custom error handling middleware.
 * Catches all errors thrown in routes and returns a formatted JSON response.
 */
const errorHandler = (err, req, res, next) => {
  // Use status code from error or default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // Show stack trace only in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

/**
 * Middleware to handle 404 Not Found errors.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
