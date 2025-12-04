import { useTheme } from "../context/ThemeContext";

/**
 * Cyber-Brutalist Theme Toggle Button
 * Animated sun/moon toggle with electric effects
 */
const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 border-3 transition-all duration-300 group overflow-hidden ${className}`}
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        WebkitTapHighlightColor: "transparent",
        background: isDark
          ? "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
          : "linear-gradient(135deg, #00D9FF 0%, #FFD700 100%)",
        borderColor: isDark ? "#00d9ff" : "#000000",
        boxShadow: isDark
          ? "3px 3px 0px 0px rgba(0, 217, 255, 0.8), 0 0 20px rgba(0, 217, 255, 0.25)"
          : "3px 3px 0px 0px rgba(0, 0, 0, 1)",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
    >
      {/* Track background pattern */}
      <div
        className={`absolute inset-0 opacity-30 ${
          isDark ? "bg-stars-pattern" : "bg-rays-pattern"
        }`}
      />

      {/* Sliding indicator */}
      <div
        className={`absolute top-0.5 w-6 h-6 border-2 flex items-center justify-center transition-all duration-300 ease-out ${
          isDark ? "left-7 rotate-0" : "left-0.5 rotate-180"
        }`}
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
            : "#FFD700",
          borderColor: isDark ? "#00d9ff" : "#000000",
          boxShadow: isDark
            ? "0 0 15px rgba(0, 217, 255, 0.7), 0 0 25px rgba(34, 197, 94, 0.3)"
            : "0 0 10px rgba(255, 215, 0, 0.6), inset 0 0 5px rgba(255, 215, 0, 0.3)",
        }}
      >
        {/* Sun Icon */}
        <svg
          className={`w-4 h-4 absolute transition-all duration-300 ${
            isDark
              ? "opacity-0 scale-50 rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: "#000" }}
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`w-4 h-4 absolute transition-all duration-300 ${
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-90"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: "#00D9FF" }}
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Electric spark effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)"
            : "rgba(0, 217, 255, 0.1)",
        }}
      />
    </button>
  );
};

export default ThemeToggle;
