/**
 * Service for handling expense data operations
 * Manages CRUD operations for expenses using Backend API
 * Implements offline-first approach with automatic sync when backend reconnects
 */

// API Base URL - Update this based on your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Storage keys
const STORAGE_KEYS = {
  EXPENSES: "expenses",
  PENDING_SYNC: "pendingSync",
  LAST_SYNC: "lastSync",
  OFFLINE_MODE: "offlineMode",
};

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
 * Checks if backend is online
 * @returns {Promise<boolean>} True if backend is reachable
 */
const isBackendOnline = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Gets pending sync queue from localStorage
 * @returns {Array} Array of pending operations
 */
const getPendingSyncQueue = () => {
  const queue = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
  return queue ? JSON.parse(queue) : [];
};

/**
 * Adds operation to pending sync queue
 * @param {Object} operation - Operation to queue {type, data, timestamp}
 */
const addToPendingSyncQueue = (operation) => {
  const queue = getPendingSyncQueue();
  queue.push({
    ...operation,
    timestamp: new Date().toISOString(),
    id: `pending_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  });
  localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(queue));
};

/**
 * Clears pending sync queue
 */
const clearPendingSyncQueue = () => {
  localStorage.removeItem(STORAGE_KEYS.PENDING_SYNC);
};

/**
 * Sets offline mode status
 * @param {boolean} isOffline - Whether app is in offline mode
 */
const setOfflineMode = (isOffline) => {
  localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE, JSON.stringify(isOffline));

  // Dispatch custom event for UI updates
  window.dispatchEvent(
    new CustomEvent("offlineModeChange", {
      detail: { isOffline },
    })
  );
};

/**
 * Gets offline mode status
 * @returns {boolean} Whether app is in offline mode
 */
export const isOfflineMode = () => {
  const offline = localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE);
  return offline ? JSON.parse(offline) : false;
};

/**
 * Syncs pending operations to backend
 * @returns {Promise<Object>} Sync result
 */
export const syncPendingOperations = async () => {
  const queue = getPendingSyncQueue();

  if (queue.length === 0) {
    return { success: true, synced: 0, failed: 0 };
  }

  const online = await isBackendOnline();
  if (!online) {
    return { success: false, synced: 0, failed: 0, message: "Backend offline" };
  }

  console.log(`🔄 Syncing ${queue.length} pending operations...`);

  let synced = 0;
  let failed = 0;
  const failedOps = [];

  for (const operation of queue) {
    try {
      switch (operation.type) {
        case "CREATE":
          await fetch(`${API_BASE_URL}/expenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(operation.data),
          });
          synced++;
          break;

        case "UPDATE":
          await fetch(`${API_BASE_URL}/expenses/${operation.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(operation.data),
          });
          synced++;
          break;

        case "DELETE":
          await fetch(`${API_BASE_URL}/expenses/${operation.id}`, {
            method: "DELETE",
          });
          synced++;
          break;

        default:
          console.warn("Unknown operation type:", operation.type);
      }
    } catch (error) {
      console.error("Failed to sync operation:", operation, error);
      failed++;
      failedOps.push(operation);
    }
  }

  // Update queue with only failed operations
  if (failedOps.length > 0) {
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(failedOps));
  } else {
    clearPendingSyncQueue();
  }

  // Update last sync timestamp
  localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());

  // Exit offline mode if sync successful
  if (synced > 0 && failed === 0) {
    setOfflineMode(false);
  }

  console.log(`✅ Sync complete: ${synced} synced, ${failed} failed`);

  return { success: true, synced, failed };
};

/**
 * Retrieves all expenses from API
 * @param {Object} filters - Optional filters (category, dateFrom, dateTo)
 * @returns {Promise<Array>} Array of expense objects
 */
export const getExpenses = async (filters = {}) => {
  try {
    // Try to sync pending operations first
    if (!isOfflineMode()) {
      await syncPendingOperations();
    }

    const queryParams = new URLSearchParams();

    if (filters.category) queryParams.append("category", filters.category);
    if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);

    const url = `${API_BASE_URL}/expenses${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    const response = await fetch(url);
    const result = await handleResponse(response);

    // Save to localStorage as cache
    saveExpensesToLocalStorage(result.data || []);

    // Mark as online
    setOfflineMode(false);

    return result.data || [];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    console.warn("📴 Backend offline - using local storage");

    // Mark as offline
    setOfflineMode(true);

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
  const expenseData = {
    amount: parseFloat(expense.amount),
    category: expense.category,
    description: expense.description || `${expense.category} Expense`,
    date: expense.date || new Date().toISOString().split("T")[0],
  };

  try {
    // Check if backend is online
    const online = await isBackendOnline();

    if (!online) {
      // Backend offline - save to localStorage and queue for sync
      console.warn("📴 Backend offline - saving to local storage");
      setOfflineMode(true);

      const localExpense = {
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...expenseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _isLocal: true,
      };

      // Add to localStorage
      const expenses = getExpensesFromLocalStorage();
      expenses.push(localExpense);
      saveExpensesToLocalStorage(expenses);

      // Add to sync queue
      addToPendingSyncQueue({
        type: "CREATE",
        data: expenseData,
      });

      return localExpense;
    }

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    const result = await handleResponse(response);

    // Update localStorage cache
    const expenses = getExpensesFromLocalStorage();
    expenses.push(result.data);
    saveExpensesToLocalStorage(expenses);

    setOfflineMode(false);

    return result.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    console.warn("📴 Saving to local storage due to error");

    setOfflineMode(true);

    // Save locally and queue for sync
    const localExpense = {
      id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...expenseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _isLocal: true,
    };

    const expenses = getExpensesFromLocalStorage();
    expenses.push(localExpense);
    saveExpensesToLocalStorage(expenses);

    addToPendingSyncQueue({
      type: "CREATE",
      data: expenseData,
    });

    return localExpense;
  }
};

/**
 * Deletes an expense by id
 * @param {string} id - Expense id to delete
 * @returns {Promise<void>}
 */
export const deleteExpense = async (id) => {
  try {
    // Delete from localStorage first
    const expenses = getExpensesFromLocalStorage();
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    saveExpensesToLocalStorage(filteredExpenses);

    // If it's a local-only expense, just remove from storage
    if (id.startsWith("local_")) {
      console.log("Deleted local expense:", id);
      return;
    }

    // Check if backend is online
    const online = await isBackendOnline();

    if (!online) {
      console.warn("📴 Backend offline - queuing delete operation");
      setOfflineMode(true);

      // Add to sync queue
      addToPendingSyncQueue({
        type: "DELETE",
        id: id,
      });

      return;
    }

    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });

    await handleResponse(response);
    setOfflineMode(false);
  } catch (error) {
    console.error("Error deleting expense:", error);
    console.warn("📴 Queuing delete for later sync");

    setOfflineMode(true);

    // Delete locally and queue for sync
    const expenses = getExpensesFromLocalStorage();
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    saveExpensesToLocalStorage(filteredExpenses);

    if (!id.startsWith("local_")) {
      addToPendingSyncQueue({
        type: "DELETE",
        id: id,
      });
    }
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

// ========== LOCAL STORAGE FUNCTIONS ==========
// Used for offline mode and caching

/**
 * Retrieves all expenses from localStorage
 * @returns {Array} Array of expense objects
 */
const getExpensesFromLocalStorage = () => {
  const expenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  return expenses ? JSON.parse(expenses) : [];
};

/**
 * Saves expenses to localStorage
 * @param {Array} expenses - Array of expense objects
 */
const saveExpensesToLocalStorage = (expenses) => {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
};

/**
 * Gets the last sync timestamp
 * @returns {string|null} ISO timestamp of last sync
 */
export const getLastSyncTime = () => {
  return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
};

/**
 * Gets count of pending sync operations
 * @returns {number} Number of pending operations
 */
export const getPendingSyncCount = () => {
  return getPendingSyncQueue().length;
};
