import express from "express";
import { body } from "express-validator";
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesByCategory,
  getTotalExpenses,
  getExpenseStatistics,
} from "../controllers/expenseController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { CATEGORIES } from "../utils/constants.js";

const router = express.Router();

/**
 * Validation rules for creating/updating expenses
 */
const expenseValidationRules = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than 0"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(CATEGORIES)
    .withMessage("Invalid category"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("Date cannot be in the future");
      }
      return true;
    }),
];

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses with optional filtering
 * @access  Public
 * @query   category, dateFrom, dateTo, page, limit
 */
router.get("/", getAllExpenses);

/**
 * @route   GET /api/expenses/summary/statistics
 * @desc    Get comprehensive expense statistics
 * @access  Public
 */
router.get("/summary/statistics", getExpenseStatistics);

/**
 * @route   GET /api/expenses/summary/by-category
 * @desc    Get expenses grouped by category
 * @access  Public
 */
router.get("/summary/by-category", getExpensesByCategory);

/**
 * @route   GET /api/expenses/summary/total
 * @desc    Get total of all expenses
 * @access  Public
 */
router.get("/summary/total", getTotalExpenses);

/**
 * @route   GET /api/expenses/:id
 * @desc    Get a single expense by ID
 * @access  Public
 */
router.get("/:id", getExpenseById);

/**
 * @route   POST /api/expenses
 * @desc    Create a new expense
 * @access  Public
 */
router.post("/", expenseValidationRules, validateRequest, createExpense);

/**
 * @route   PUT /api/expenses/:id
 * @desc    Update an expense
 * @access  Public
 */
router.put("/:id", expenseValidationRules, validateRequest, updateExpense);

/**
 * @route   DELETE /api/expenses/:id
 * @desc    Delete an expense
 * @access  Public
 */
router.delete("/:id", deleteExpense);

export default router;
