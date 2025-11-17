/**
 * Service for handling expense data operations
 * Manages CRUD operations for expenses using localStorage
 */

/**
 * Retrieves all expenses from localStorage
 * @returns {Array} Array of expense objects
 */
export const getExpenses = () => {
  const expenses = localStorage.getItem('expenses');
  return expenses ? JSON.parse(expenses) : [];
};

/**
 * Saves expenses to localStorage
 * @param {Array} expenses - Array of expense objects to save
 */
const saveExpenses = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

/**
 * Adds a new expense
 * @param {Object} expense - Expense object with amount, category, date
 * @returns {Object} The added expense with generated id
 */
export const addExpense = (expense) => {
  const expenses = getExpenses();
  const newExpense = {
    id: Date.now().toString(),
    ...expense,
    amount: parseFloat(expense.amount),
    date: expense.date || new Date().toISOString().split('T')[0]
  };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

/**
 * Deletes an expense by id
 * @param {string} id - Expense id to delete
 */
export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter(expense => expense.id !== id);
  saveExpenses(filteredExpenses);
};

/**
 * Updates an existing expense
 * @param {string} id - Expense id to update
 * @param {Object} updatedExpense - Updated expense data
 */
export const updateExpense = (id, updatedExpense) => {
  const expenses = getExpenses();
  const index = expenses.findIndex(expense => expense.id === id);
  if (index !== -1) {
    expenses[index] = {
      ...expenses[index],
      ...updatedExpense,
      amount: parseFloat(updatedExpense.amount)
    };
    saveExpenses(expenses);
  }
};

/**
 * Gets total expenses grouped by category
 * @returns {Object} Object with category as key and total amount as value
 */
export const getExpensesByCategory = () => {
  const expenses = getExpenses();
  const categoryTotals = {};
  
  expenses.forEach(expense => {
    const category = expense.category || 'Uncategorized';
    categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
  });
  
  return categoryTotals;
};

/**
 * Gets total of all expenses
 * @returns {number} Total amount of all expenses
 */
export const getTotalExpenses = () => {
  const expenses = getExpenses();
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

/**
 * Filters expenses based on criteria
 * @param {Object} filters - Filter criteria (category, dateFrom, dateTo)
 * @returns {Array} Filtered array of expenses
 */
export const filterExpenses = (filters) => {
  let expenses = getExpenses();
  
  if (filters.category && filters.category !== 'All') {
    expenses = expenses.filter(expense => expense.category === filters.category);
  }
  
  if (filters.dateFrom) {
    expenses = expenses.filter(expense => expense.date >= filters.dateFrom);
  }
  
  if (filters.dateTo) {
    expenses = expenses.filter(expense => expense.date <= filters.dateTo);
  }
  
  return expenses;
};

