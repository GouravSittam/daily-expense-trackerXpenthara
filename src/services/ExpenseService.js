/**
 * Service for handling expense data operations
 * Manages CRUD operations for expenses using Backend API
 */

// API Base URL - Update this based on your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Helper function to handle API errors
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed JSON response
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};

/**
 * Retrieves all expenses from API
 * @param {Object} filters - Optional filters (category, dateFrom, dateTo)
 * @returns {Promise<Array>} Array of expense objects
 */
export const getExpenses = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.category) queryParams.append("category", filters.category);
    if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);

    const url = `${API_BASE_URL}/expenses${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    const response = await fetch(url);
    const result = await handleResponse(response);

    return result.data || [];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    // Fallback to localStorage if API fails
    return getExpensesFromLocalStorage();
  }
};

/**
 * Adds a new expense
 * @param {Object} expense - Expense object with amount, category, date, description
 * @returns {Promise<Object>} The added expense with generated id
 */
export const addExpense = async (expense) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(expense.amount),
        category: expense.category,
        description: expense.description || `${expense.category} Expense`,
        date: expense.date || new Date().toISOString().split("T")[0],
      }),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

/**
 * Deletes an expense by id
 * @param {string} id - Expense id to delete
 * @returns {Promise<void>}
 */
export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });

    await handleResponse(response);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

/**
 * Updates an existing expense
 * @param {string} id - Expense id to update
 * @param {Object} updatedExpense - Updated expense data
 * @returns {Promise<Object>} Updated expense
 */
export const updateExpense = async (id, updatedExpense) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(updatedExpense.amount),
        category: updatedExpense.category,
        description: updatedExpense.description,
        date: updatedExpense.date,
      }),
    });

    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

/**
 * Gets total expenses grouped by category
 * @returns {Promise<Object>} Object with category as key and total amount as value
 */
export const getExpensesByCategory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/summary/statistics`);
    const result = await handleResponse(response);

    return result.data.expensesByCategory || {};
  } catch (error) {
    console.error("Error fetching category summary:", error);
    return {};
  }
};

/**
 * Gets total of all expenses
 * @returns {Promise<number>} Total amount of all expenses
 */
export const getTotalExpenses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/summary/statistics`);
    const result = await handleResponse(response);

    return result.data.total || 0;
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    return 0;
  }
};

/**
 * Filters expenses based on criteria
 * @param {Object} filters - Filter criteria (category, dateFrom, dateTo)
 * @returns {Promise<Array>} Filtered array of expenses
 */
export const filterExpenses = async (filters) => {
  return await getExpenses(filters);
};

// ========== LOCAL STORAGE FALLBACK FUNCTIONS ==========
// These functions are kept as fallback when API is unavailable

/**
 * Retrieves all expenses from localStorage (fallback)
 * @returns {Array} Array of expense objects
 */
const getExpensesFromLocalStorage = () => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};
