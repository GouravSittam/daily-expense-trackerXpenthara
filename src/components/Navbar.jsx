import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Shuffle from "./Shuffle";

/**
 * Cyber-Brutalist Navbar component
 * Features electric accents and bold typography with authentication
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-b-4 border-eco-cyan shadow-lg"
          : "bg-white/90 backdrop-blur-md border-b-4 border-eco-cyan/50"
      }`}
      style={{
        fontFamily: "Space Grotesk, Montserrat, sans-serif",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        willChange: "transform",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 xs:h-16 sm:h-18 md:h-20">
          {/* Logo/Brand - Brutalist */}
          <div
            className="flex items-center gap-1 xs:gap-2 cursor-pointer group touch-manipulation"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className="text-2xl"></span>
            <Shuffle
              text="EXPENSE TRACKER"
              shuffleDirection="right"
              duration={0.5}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power2.inOut"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={false}
              triggerOnHover={true}
              respectReducedMotion={true}
              tag="span"
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-gray-900 group-hover:text-eco-cyan transition-colors duration-300 select-none uppercase tracking-tight"
              style={{
                fontFamily: "Space Grotesk, Montserrat, sans-serif",
                fontWeight: "900",
                letterSpacing: "-0.02em",
                textShadow: "2px 2px 0px rgba(0, 217, 255, 0.3)",
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
            />
          </div>

          {/* Desktop Navigation - Brutalist Buttons */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-4">
            <button
              onClick={() => scrollToSection("add-expense")}
              className="px-3 py-1.5 border-2 border-eco-cyan text-eco-cyan hover:bg-eco-cyan hover:text-black font-bold text-xs uppercase tracking-wider transition-all hover:shadow-neon touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Add
            </button>
            <button
              onClick={() => scrollToSection("expense-list")}
              className="px-3 py-1.5 border-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-black font-bold text-xs uppercase tracking-wider transition-all hover:shadow-neon-green touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Expenses
            </button>
            <button
              onClick={() => scrollToSection("summary")}
              className="px-3 py-1.5 border-2 border-eco-purple text-eco-purple hover:bg-eco-purple hover:text-black font-bold text-xs uppercase tracking-wider transition-all hover:shadow-neon-purple touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Summary
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="px-3 py-1.5 border-2 border-eco-pink text-eco-pink hover:bg-eco-pink hover:text-black font-bold text-xs uppercase tracking-wider transition-all hover:shadow-neon-pink touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Analytics
            </button>

            {/* CTA Button - Brutalist */}
            <a
              href="https://github.com/GouravSittam/daily-expense-trackerXpenthara"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-eco-cyan text-black border-2 border-black font-black text-xs uppercase tracking-wider hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </a>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="px-4 py-2 border-2 border-eco-purple text-eco-purple hover:bg-eco-purple hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 touch-manipulation"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span>👤</span>
                <span className="hidden xl:inline">
                  {user?.name || user?.email?.split("@")[0]}
                </span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border-4 border-black shadow-brutal-lg overflow-hidden">
                  <div className="px-4 py-3 bg-eco-cyan/10 border-b-2 border-black">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Logged in as
                    </p>
                    <p className="text-sm font-black text-gray-900 truncate">
                      {user?.email}
                    </p>
                    {user?.name && (
                      <p className="text-xs text-gray-600 mt-1">{user.name}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 text-left font-bold text-sm uppercase tracking-wider bg-white hover:bg-red-500 hover:text-white border-t-2 border-black transition-all"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 border-2 border-eco-cyan text-eco-cyan hover:bg-eco-cyan hover:text-black transition-all touch-manipulation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu - Brutalist */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <div className="flex flex-col gap-2 pt-4 border-t-2 border-eco-cyan/50">
            <button
              onClick={() => scrollToSection("add-expense")}
              className="text-left px-4 py-3 border-2 border-eco-cyan text-eco-cyan hover:bg-eco-cyan hover:text-black font-bold text-sm uppercase tracking-wider transition-all touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ⚡ Add Expense
            </button>
            <button
              onClick={() => scrollToSection("expense-list")}
              className="text-left px-4 py-3 border-2 border-eco-green text-eco-green hover:bg-eco-green hover:text-black font-bold text-sm uppercase tracking-wider transition-all touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              💸 My Expenses
            </button>
            <button
              onClick={() => scrollToSection("summary")}
              className="text-left px-4 py-3 border-2 border-eco-purple text-eco-purple hover:bg-eco-purple hover:text-white font-bold text-sm uppercase tracking-wider transition-all touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              📊 Summary
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="text-left px-4 py-3 border-2 border-eco-pink text-eco-pink hover:bg-eco-pink hover:text-white font-bold text-sm uppercase tracking-wider transition-all touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              📈 Analytics
            </button>
            <a
              href="https://github.com/GouravSittam/daily-expense-trackerXpenthara"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 bg-eco-cyan text-black border-2 border-black font-black text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-brutal-sm transition-all touch-manipulation"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>View on GitHub</span>
            </a>

            {/* User Info & Logout - Mobile */}
            <div className="mt-2 px-4 py-3 bg-eco-purple/10 border-2 border-eco-purple">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Logged in as
              </p>
              <p className="text-sm font-black text-gray-900 truncate mb-2">
                {user?.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white border-2 border-black font-bold text-sm uppercase tracking-wider hover:bg-red-600 transition-all touch-manipulation"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
