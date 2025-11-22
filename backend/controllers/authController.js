import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../utils/constants.js";

/**
 * Controller for handling authentication-related operations
 * Contains all business logic for user registration, login, and authentication
 */

/**
 * Generate JWT token for user
 * @param {string} userId - User ID to encode in token
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

/**
 * Register a new user
 * @route POST /api/auth/register
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

/**
 * Logout user
 * @route POST /api/auth/logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const logout = async (req, res) => {
  try {
    // Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error logging out",
      error: error.message,
    });
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/profile
 * @param {Object} req - Express request object (user attached by auth middleware)
 * @param {Object} res - Express response object
 */
export const getProfile = async (req, res) => {
  try {
    // User is already attached to request by auth middleware
    const user = await User.findById(req.user.id).populate("expenseCount");

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "User profile retrieved successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          expenseCount: user.expenseCount || 0,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
};

/**
 * Update user profile
 * @route PUT /api/auth/profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};
