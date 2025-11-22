import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ExpenseTracker from "./pages/ExpenseTracker";
import AuthPage from "./pages/AuthPage";
import BrutalLoader from "./components/BrutalLoader";
import "./App.css";

/**
 * Protected Route Component
 * Redirects to auth page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-eco-cyan/10 via-transparent to-eco-purple/10"></div>
        <div className="relative z-10 bg-white border-6 border-black p-8 shadow-brutal-lg">
          <BrutalLoader size="lg" text="LOADING..." />
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
};

/**
 * Public Route Component
 * Redirects to home if user is already authenticated
 */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-eco-cyan/10 via-transparent to-eco-purple/10"></div>
        <div className="relative z-10 bg-white border-6 border-black p-8 shadow-brutal-lg">
          <BrutalLoader size="lg" text="LOADING..." />
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : children;
};

/**
 * Main App component
 * Sets up routing and authentication
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ExpenseTracker />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
