import { useState, useEffect } from "react";
import Shuffle from "./Shuffle";

/**
 * Modern Navbar component with glassmorphism design
 * Matches the project's IBM Plex Sans Condensed font theme
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
          : "bg-white/70 backdrop-blur-md shadow-md"
      }`}
      style={{
        fontFamily: "IBM Plex Sans Condensed, sans-serif",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        willChange: "transform",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 xs:h-16 sm:h-18 md:h-20">
          {/* Logo/Brand */}
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
            <Shuffle
              text="💰 Expense Tracker 💰"
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
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-500 select-none"
              style={{
                fontFamily: "IBM Plex Sans Condensed, sans-serif",
                fontWeight: "700",
                letterSpacing: "-0.03em",
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-8">
            <button
              onClick={() => scrollToSection("add-expense")}
              className="text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors font-light text-xs lg:text-sm xl:text-base relative group whitespace-nowrap touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Add Expense
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("expense-list")}
              className="text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors font-light text-xs lg:text-sm xl:text-base relative group whitespace-nowrap touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              My Expenses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("summary")}
              className="text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors font-light text-xs lg:text-sm xl:text-base relative group whitespace-nowrap touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Summary
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors font-light text-xs lg:text-sm xl:text-base relative group whitespace-nowrap touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Analytics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* CTA Button */}
            <a
              href="https://github.com/GouravSittam/daily-expense-trackerXpenthara"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 xl:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 font-medium text-xs xl:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-1.5 lg:gap-2 whitespace-nowrap touch-manipulation"
              style={{
                fontWeight: "500",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg
                className="w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4"
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 xs:p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5 xs:w-6 xs:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 xs:w-6 xs:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-3 xs:pb-4"
              : "max-h-0 opacity-0"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <div className="flex flex-col gap-2 xs:gap-3 pt-3 xs:pt-4 border-t border-gray-200/50">
            <button
              onClick={() => scrollToSection("add-expense")}
              className="text-left px-3 xs:px-4 py-2 xs:py-2.5 text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all font-light text-sm xs:text-base touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Add Expense
            </button>
            <button
              onClick={() => scrollToSection("expense-list")}
              className="text-left px-3 xs:px-4 py-2 xs:py-2.5 text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all font-light text-sm xs:text-base touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              My Expenses
            </button>
            <button
              onClick={() => scrollToSection("summary")}
              className="text-left px-3 xs:px-4 py-2 xs:py-2.5 text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all font-light text-sm xs:text-base touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Summary
            </button>
            <button
              onClick={() => scrollToSection("analytics")}
              className="text-left px-3 xs:px-4 py-2 xs:py-2.5 text-gray-700 hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-all font-light text-sm xs:text-base touch-manipulation"
              style={{
                fontWeight: "400",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Analytics
            </button>
            <a
              href="https://github.com/GouravSittam/daily-expense-trackerXpenthara"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 xs:mt-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all font-medium text-center text-sm xs:text-base flex items-center justify-center gap-1.5 xs:gap-2 touch-manipulation"
              style={{
                fontWeight: "500",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <svg
                className="w-3.5 h-3.5 xs:w-4 xs:h-4"
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
