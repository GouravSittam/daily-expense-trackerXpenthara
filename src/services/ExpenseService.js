/**
 * Service for handling expense data operations
 * Manages CRUD operations for expenses using Backend API
 * Implements offline-first approach with automatic sync when backend reconnects
 */

// API Base URL - Update this based on your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://trackwise-penthara-backend.vercel.app/api";

// Storage keys
const STORAGE_KEYS = {
  EXPENSES: "expenses",
  PENDING_SYNC: "pendingSync",
  LAST_SYNC: "lastSync",
  OFFLINE_MODE: "offlineMode",
};

// Flag to prevent duplicate console banners
let hasShownBanner = false;

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
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for Vercel cold starts

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      // Show banner only once per session
      if (!hasShownBanner) {
        // Awesome animated console banner
        console.log(
          "%c╔═══════════════════════════════════════════════════════════╗",
          "color: #667eea; font-weight: bold; font-size: 12px;"
        );
        console.log(
          "%c║        🚀 TRACKWISE PENTHARA - CONNECTED ✨              ║",
          "background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); color: white; padding: 12px 20px; font-weight: bold; font-size: 16px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
        );
        console.log(
          "%c║                                                           ║",
          "color: #667eea; font-weight: bold; font-size: 12px;"
        );
        console.log(
          "%c║  ⚡ Server Status: ONLINE & READY                        ║",
          "color: #10b981; font-weight: bold; font-size: 13px; text-shadow: 0 0 10px #10b981;"
        );
        console.log(
          "%c║  💜 Created by: Gourav Chaudhary                         ║",
          "color: #a855f7; font-weight: bold; font-size: 13px;"
        );
        console.log(
          "%c║  🔗 GitHub: GouravSittam/daily-expense-trackerXpenthara ║",
          "color: #3b82f6; font-size: 12px; font-style: italic;"
        );
        console.log(
          "%c║  🌐 Backend: trackwise-penthara-backend.vercel.app       ║",
          "color: #8b5cf6; font-size: 11px;"
        );
        console.log(
          "%c╚═══════════════════════════════════════════════════════════╝",
          "color: #667eea; font-weight: bold; font-size: 12px;"
        );
        console.log(
          "%c✨ Welcome to TrackWise! Your expenses are in good hands 🎯",
          "background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin-top: 10px;"
        );
        hasShownBanner = true;
      }
      setOfflineMode(false);
      return true;
    }

    console.warn(
      "%c⚠️ BACKEND UNREACHABLE",
      "background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.log(
      "%c🔄 Switching to Offline Mode...",
      "color: #ff9800; font-size: 12px; font-style: italic;"
    );
    setOfflineMode(true);
    return false;
  } catch (error) {
    console.error(
      "%c❌ CONNECTION FAILED - OFFLINE MODE ACTIVATED",
      "background: linear-gradient(135deg, #f44336 0%, #e91e63 50%, #9c27b0 100%); color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.log(
      "%c💾 Don't worry! Your data is safe locally 🛡️",
      "background: linear-gradient(90deg, #9c27b0 0%, #673ab7 100%); color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px;"
    );
    console.log(
      "%c🔄 Changes will sync automatically when you're back online ⚡",
      "color: #9c27b0; font-size: 11px; font-style: italic;"
    );
    setOfflineMode(true);
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

  console.log(
    `%c🔄 SYNCING ${queue.length} OPERATIONS ⚡`,
    "background: linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #a8ff78 100%); color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; font-size: 14px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 1px;"
  );
  console.log(
    "%c⏳ Please wait while we sync your data...",
    "color: #11998e; font-size: 11px; font-style: italic;"
  );

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

  console.log(
    `%c✨ SYNC COMPLETE! 🎉`,
    "background: linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #667eea 100%); color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; font-size: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 1px;"
  );
  console.log(
    `%c✅ ${synced} Synced Successfully | ❌ ${failed} Failed`,
    "background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; border: 2px solid #10b981;"
  );
  console.log(
    "%c🎯 All your data is up to date! - TrackWise by Gourav",
    "color: #667eea; font-size: 11px; font-style: italic;"
  );

  return { success: true, synced, failed };
};

/**
 * Retrieves all expenses from API
 * @param {Object} filters - Optional filters (category, dateFrom, dateTo)
 * @returns {Promise<Array>} Array of expense objects
 */
export const getExpenses = async (filters = {}) => {
  try {
    // First check if backend is online
    const online = await isBackendOnline();

    if (!online) {
      console.warn(
        "%c📴 OFFLINE MODE ACTIVE",
        "background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #ff6b6b 100%); color: white; padding: 10px 20px; border-radius: 10px; font-weight: bold; font-size: 13px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
      );
      console.log(
        "%c💾 Using Local Storage | Your data is safe!",
        "color: #ff6b6b; font-size: 11px; font-weight: bold;"
      );
      return getExpensesFromLocalStorage();
    }

    // Try to sync pending operations first
    await syncPendingOperations();

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
    console.error(
      "%c⚠️ FETCH FAILED - SWITCHING TO LOCAL DATA",
      "background: linear-gradient(135deg, #ff6348 0%, #ff4757 50%, #ff3838 100%); color: white; padding: 10px 20px; border-radius: 10px; font-weight: bold; font-size: 13px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.warn(
      "%c📴 Offline Mode Active | Local Storage Engaged 💾",
      "background: linear-gradient(90deg, #ffa502 0%, #ff6348 100%); color: white; padding: 6px 14px; border-radius: 8px; font-weight: bold; font-size: 12px;"
    );
    console.log(
      "%c🔄 Will retry automatically when connection is restored",
      "color: #ffa502; font-size: 10px; font-style: italic;"
    );

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
      console.warn(
        "%c💾 EXPENSE SAVED LOCALLY",
        "background: linear-gradient(135deg, #fa709a 0%, #fee140 50%, #fa709a 100%); color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; font-size: 14px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"
      );
      console.log(
        "%c🔄 Will sync when connection returns | TrackWise",
        "background: rgba(250, 112, 154, 0.2); color: #fa709a; padding: 4px 10px; border-radius: 6px; font-size: 11px; border: 1px solid #fa709a;"
      );
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
    console.error(
      "%c❌ SAVE FAILED - BACKUP MODE ACTIVATED",
      "background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #e74c3c 100%); color: white; padding: 10px 20px; border-radius: 10px; font-weight: bold; font-size: 13px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.warn(
      "%c💜 Offline Backup Active | TrackWise by Gourav Chaudhary",
      "background: linear-gradient(90deg, #9b59b6 0%, #8e44ad 100%); color: white; padding: 6px 14px; border-radius: 8px; font-weight: bold; font-size: 12px;"
    );
    console.log(
      "%c🛡️ Your expense is safe in local storage!",
      "color: #9b59b6; font-size: 11px; font-style: italic;"
    );

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
      console.log(
        "%c🗑️ EXPENSE DELETED SUCCESSFULLY",
        "background: linear-gradient(135deg, #ee0979 0%, #ff6a00 50%, #ee0979 100%); color: white; padding: 10px 20px; border-radius: 12px; font-weight: bold; font-size: 13px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
      );
      console.log(
        "%c✨ Expense removed from your records - TrackWise",
        "color: #ee0979; font-size: 11px; font-style: italic;"
      );
      return;
    }

    // Check if backend is online
    const online = await isBackendOnline();

    if (!online) {
      console.warn(
        "%c📴 OFFLINE DELETE - QUEUED FOR SYNC",
        "background: linear-gradient(90deg, #f39c12 0%, #e67e22 100%); color: white; padding: 8px 16px; border-radius: 10px; font-weight: bold; font-size: 12px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
      );
      console.log(
        "%c🔄 Delete will process when connection returns",
        "color: #f39c12; font-size: 10px; font-style: italic;"
      );
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
    console.error(
      "%c❌ DELETE FAILED - OPERATION QUEUED",
      "background: linear-gradient(135deg, #c0392b 0%, #e74c3c 50%, #c0392b 100%); color: white; padding: 10px 20px; border-radius: 10px; font-weight: bold; font-size: 13px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.warn(
      "%c🔄 Will Retry When Online | TrackWise Penthara",
      "background: linear-gradient(90deg, #3498db 0%, #2980b9 100%); color: white; padding: 6px 14px; border-radius: 8px; font-weight: bold; font-size: 11px;"
    );
    console.log(
      "%c💾 Delete operation saved for automatic retry",
      "color: #3498db; font-size: 10px; font-style: italic;"
    );

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
    console.error(
      "%c❌ FAILED TO LOAD STATISTICS",
      "background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #e74c3c 100%); color: white; padding: 8px 16px; border-radius: 10px; font-weight: bold; font-size: 12px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.log(
      "%c📊 Unable to fetch category statistics | TrackWise",
      "color: #e74c3c; font-size: 10px; font-style: italic;"
    );
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
    console.error(
      "%c❌ FAILED TO CALCULATE TOTAL",
      "background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #e74c3c 100%); color: white; padding: 8px 16px; border-radius: 10px; font-weight: bold; font-size: 12px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
    );
    console.log(
      "%c💰 Unable to calculate total expenses | TrackWise",
      "color: #e74c3c; font-size: 10px; font-style: italic;"
    );
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
