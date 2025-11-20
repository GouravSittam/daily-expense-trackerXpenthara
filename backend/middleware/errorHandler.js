import { STATUS_CODES } from "../utils/constants.js";

/**
 * Global error handler middleware
 * Catches and formats all errors thrown in the application
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // Mongoose cast error (invalid ID format)
  if (err.name === "CastError") {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      success: false,
      message: "Duplicate entry detected",
    });
  }

  // Default error response
  res.status(err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
