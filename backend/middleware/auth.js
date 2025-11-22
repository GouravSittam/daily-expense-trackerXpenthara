import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { STATUS_CODES } from "../utils/constants.js";

/**
 * Authentication middleware
 * Protects routes by verifying JWT token
 * Attaches user object to request if authenticated
 */

/**
 * Middleware to protect routes requiring authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies or Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Not authorized to access this route. Please login.",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database (exclude password)
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
          success: false,
          message: "User not found. Please login again.",
        });
      }

      // Attach user to request object
      req.user = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      next();
    } catch (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error authenticating user",
      error: error.message,
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't reject if no token
 * Useful for routes that can work with or without authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies or Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token, continue without authentication
    if (!token) {
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.id);

      if (user) {
        // Attach user to request object
        req.user = {
          id: user._id,
          email: user.email,
          name: user.name,
        };
      }
    } catch (error) {
      // Token invalid, but continue without authentication
      console.log("Optional auth: Invalid token, continuing without auth");
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next();
  }
};
