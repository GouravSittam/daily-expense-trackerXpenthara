/**
 * Service for handling authentication operations
 * Manages user registration, login, logout, and profile operations
 * Matches the ExpenseService.js patterns and structure
 */

// API Base URL - Update this based on your backend server
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://trackwise-penthara-backend.vercel.app/api";

// Storage keys
const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "token",
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
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User name (optional)
 * @returns {Promise<Object>} User data and token
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      body: JSON.stringify(userData),
    });

    const data = await handleResponse(response);

    // Store user and token in localStorage
    if (data.success && data.data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.data.token);
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);

    // Store user and token in localStorage
    if (data.success && data.data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies
    });

    const data = await handleResponse(response);

    // Clear user and token from localStorage
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);

    return data;
  } catch (error) {
    console.error("Logout error:", error);
    // Clear localStorage even if API call fails
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getProfile = async () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies
    });

    const data = await handleResponse(response);

    // Update stored user data
    if (data.success && data.data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} updateData - Updated profile data
 * @param {string} updateData.email - New email (optional)
 * @param {string} updateData.name - New name (optional)
 * @returns {Promise<Object>} Updated user data
 */
export const updateProfile = async (updateData) => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include cookies
      body: JSON.stringify(updateData),
    });

    const data = await handleResponse(response);

    // Update stored user data
    if (data.success && data.data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
    }

    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};

/**
 * Get current user from localStorage
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} Token or null
 */
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  const user = getCurrentUser();
  return !!(token && user);
};

/**
 * Clear all authentication data
 * Used when token is invalid or expired
 */
export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};
