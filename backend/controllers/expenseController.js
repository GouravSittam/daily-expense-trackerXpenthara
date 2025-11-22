import Expense from "../models/Expense.js";
import { STATUS_CODES, PAGINATION } from "../utils/constants.js";

/**
 * Controller for handling expense-related operations
 * Contains all business logic for CRUD operations
 */

/**
 * Get all expenses with optional filtering and pagination
 * @route GET /api/expenses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllExpenses = async (req, res) => {
  try {
    const {
      category,
      dateFrom,
      dateTo,
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
    } = req.query;

    // Build query filter - always filter by authenticated user
    const filter = {
      user: req.user.id,
    };

    if (category) {
      filter.category = category;
    }

    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) {
        filter.date.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.date.$lte = new Date(dateTo);
      }
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), PAGINATION.MAX_LIMIT);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const expenses = await Expense.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalExpenses = await Expense.countDocuments(filter);

    // Format expenses for response
    const formattedExpenses = expenses.map((expense) => ({
      id: expense._id.toString(),
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.toISOString().split("T")[0],
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    }));

    res.status(STATUS_CODES.OK).json({
      success: true,
      count: formattedExpenses.length,
      total: totalExpenses,
      page: pageNum,
      totalPages: Math.ceil(totalExpenses / limitNum),
      data: formattedExpenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching expenses",
      error: error.message,
    });
  }
};

/**
 * Get a single expense by ID
 * @route GET /api/expenses/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ _id: id, user: req.user.id });

    if (!expense) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: expense.toResponseObject(),
    });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching expense",
      error: error.message,
    });
  }
};

/**
 * Create a new expense
 * @route POST /api/expenses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    // Create new expense
    const expense = new Expense({
      user: req.user.id,
      amount: parseFloat(amount),
      category,
      description: description || `${category} Expense`,
      date: date || new Date(),
    });

    await expense.save();

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Expense created successfully",
      data: expense.toResponseObject(),
    });
  } catch (error) {
    console.error("Error creating expense:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating expense",
      error: error.message,
    });
  }
};

/**
 * Update an existing expense
 * @route PUT /api/expenses/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, description, date } = req.body;

    // Find expense - ensure it belongs to the user
    const expense = await Expense.findOne({ _id: id, user: req.user.id });

    if (!expense) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Update fields if provided
    if (amount !== undefined) expense.amount = parseFloat(amount);
    if (category !== undefined) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date !== undefined) expense.date = new Date(date);

    await expense.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Expense updated successfully",
      data: expense.toResponseObject(),
    });
  } catch (error) {
    console.error("Error updating expense:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating expense",
      error: error.message,
    });
  }
};

/**
 * Delete an expense
 * @route DELETE /api/expenses/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Expense deleted successfully",
      data: expense.toResponseObject(),
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};

/**
 * Get expenses grouped by category
 * @route GET /api/expenses/summary/by-category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getExpensesByCategory = async (req, res) => {
  try {
    const categoryTotals = await Expense.getExpensesByCategory(req.user.id);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: categoryTotals,
    });
  } catch (error) {
    console.error("Error fetching category summary:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching category summary",
      error: error.message,
    });
  }
};

/**
 * Get total of all expenses
 * @route GET /api/expenses/summary/total
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getTotalExpenses = async (req, res) => {
  try {
    const total = await Expense.getTotalExpenses(req.user.id);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: { total },
    });
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching total expenses",
      error: error.message,
    });
  }
};

/**
 * Get expense statistics
 * @route GET /api/expenses/summary/statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getExpenseStatistics = async (req, res) => {
  try {
    const [categoryTotals, total, count] = await Promise.all([
      Expense.getExpensesByCategory(req.user.id),
      Expense.getTotalExpenses(req.user.id),
      Expense.countDocuments({ user: req.user.id }),
    ]);

    // Convert category totals to object format
    const expensesByCategory = {};
    categoryTotals.forEach((item) => {
      expensesByCategory[item.category] = item.total;
    });

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        total,
        count,
        expensesByCategory,
        categoryTotals,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
