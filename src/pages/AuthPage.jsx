import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LightRays from "../components/LightRays";
import BrutalLoader from "../components/BrutalLoader";
import ThemeToggle from "../components/ThemeToggle";

/**
 * Authentication Page Component
 * Handles user login and registration with beautiful UI
 * Matches the project's visual theme and styling
 */
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError("");
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        // Login
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
      }

      // Navigate to expense tracker on success
      navigate("/");
    } catch (error) {
      setFormError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggle between login and register
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormError("");
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center transition-all duration-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e293b 75%, #0f172a 100%)"
          : "#f9fafb",
      }}
    >
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Full Screen Loader Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className="border-6 p-8 shadow-brutal-lg"
            style={{
              background: isDark
                ? "linear-gradient(145deg, #1e293b 0%, #334155 100%)"
                : "white",
              borderColor: isDark ? "#00d9ff" : "black",
            }}
          >
            <BrutalLoader
              size="lg"
              text={isLogin ? "LOGGING IN..." : "CREATING ACCOUNT..."}
            />
          </div>
        </div>
      )}

      {/* LightRays Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor={isDark ? "#00d9ff" : "#00D9FF"}
          raysSpeed={isDark ? 0.7 : 0.8}
          lightSpread={isDark ? 0.6 : 0.6}
          rayLength={isDark ? 1.6 : 1.5}
          followMouse={true}
          mouseInfluence={isDark ? 0.06 : 0.05}
          noiseAmount={0.08}
          distortion={0.02}
          fadeDistance={isDark ? 1.1 : 1.2}
          saturation={isDark ? 0.7 : 0.5}
        />
      </div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="brutal-card p-6 sm:p-8 border-6 relative overflow-hidden"
          style={{
            background: isDark
              ? "linear-gradient(145deg, #1e293b 0%, #334155 100%)"
              : "white",
            borderColor: isDark ? "#00d9ff" : "black",
          }}
        >
          {/* Electric corner accents */}
          <div
            className={`absolute top-0 right-0 w-24 h-24 opacity-30 blur-2xl ${
              isDark ? "bg-cyan-400" : "bg-eco-cyan"
            }`}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-24 h-24 opacity-30 blur-2xl ${
              isDark ? "bg-green-400" : "bg-eco-purple"
            }`}
          ></div>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 relative">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-4xl sm:text-5xl"></span>
              <h1
                className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight"
                style={{
                  fontFamily: "Space Grotesk, Montserrat, sans-serif",
                  textShadow: "3px 3px 0px rgba(0, 217, 255, 0.3)",
                }}
              >
                {isLogin ? (
                  <>
                    <span className="text-eco-cyan">WELCOME</span> BACK
                  </>
                ) : (
                  <>
                    <span className="text-eco-purple">JOIN</span> US
                  </>
                )}
              </h1>
            </div>
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              {isLogin
                ? "Login to manage your expenses"
                : "Create an account to get started"}
            </p>
          </div>

          {/* Error Message */}
          {formError && (
            <div className="mb-6 p-4 bg-red-50 border-4 border-eco-red text-eco-red text-sm font-bold uppercase tracking-wide">
              ⚠️ {formError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Field (Register Only) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Name <span className="text-eco-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-4 border-gray-900 text-base font-bold focus:outline-none focus:border-eco-purple focus:shadow-brutal-sm transition-all"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                  placeholder="Enter your name"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
              >
                Email <span className="text-eco-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-4 border-gray-900 text-base font-bold focus:outline-none focus:border-eco-cyan focus:shadow-brutal-sm transition-all"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                }}
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
              >
                Password <span className="text-eco-red">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border-4 border-gray-900 text-base font-bold focus:outline-none focus:border-eco-green focus:shadow-brutal-sm transition-all"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                }}
                placeholder="••••••••"
              />
              {!isLogin && (
                <p className="mt-2 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Min 6 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 border-4 border-black bg-eco-cyan text-black font-black text-base uppercase tracking-wider hover:bg-eco-green hover:shadow-brutal transition-all disabled:opacity-50 disabled:cursor-not-allowed active:translate-x-1 active:translate-y-1 relative"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                textShadow: "2px 2px 0px rgba(255, 255, 255, 0.3)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></span>
                  PROCESSING...
                </span>
              ) : isLogin ? (
                "🔓 LOGIN"
              ) : (
                "🚀 CREATE ACCOUNT"
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide ">
              {isLogin ? "No account yet?" : "Already registered?"}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="mt-2 px-5 py-2 border-4 border-eco-purple text-eco-purple hover:bg-eco-purple hover:text-black font-bold text-sm uppercase tracking-wider transition-all hover:shadow-neon-purple"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              {isLogin ? "SIGN UP" : "LOGIN"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t-4 border-gray-200 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              🔒 Secure & Private
            </p>
          </div>
        </div>

        {/* Creator Credit */}
        <div className="mt-6 text-center">
          <div className="inline-block px-5 py-3 bg-white border-4 border-black">
            <p className="text-sm font-black text-gray-900 uppercase tracking-wide">
              Created by{" "}
              <a
                href="https://github.com/GouravSittam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-eco-cyan hover:text-eco-purple transition-colors underline"
                style={{
                  textShadow: "2px 2px 0px rgba(0, 217, 255, 0.3)",
                }}
              >
                Gourav Chaudhary
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
