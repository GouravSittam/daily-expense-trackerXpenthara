import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getProfile,
  getCurrentUser,
  isAuthenticated as checkAuth,
  clearAuthData,
} from "../services/AuthService";

/**
 * Authentication Context
 * Manages global authentication state throughout the application
 */

const AuthContext = createContext(null);

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the app to provide auth state and functions
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize auth state on mount
   * Check if user is already logged in
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (checkAuth()) {
          const currentUser = getCurrentUser();
          setUser(currentUser);

          // Optionally verify token with backend
          try {
            const profileData = await getProfile();
            if (profileData.success) {
              setUser(profileData.data.user);
            }
          } catch (err) {
            // Token might be expired, clear auth data
            console.error("Failed to verify token:", err);
            clearAuthData();
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Register a new user
   * @param {Object} userData - Registration data
   */
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await registerService(userData);

      if (response.success) {
        setUser(response.data.user);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   */
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await loginService(credentials);

      if (response.success) {
        setUser(response.data.user);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setError(null);
      await logoutService();
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    } finally {
      // Clear user state regardless of API response
      setUser(null);
    }
  };

  /**
   * Update user profile
   * @param {Object} updateData - Updated profile data
   */
  const updateUser = async (updateData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await getProfile();

      if (response.success) {
        setUser(response.data.user);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!user && checkAuth();
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
