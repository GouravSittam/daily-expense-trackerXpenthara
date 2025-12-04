/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra small devices (landscape phones)
      },
      fontFamily: {
        "ibm-plex": ["IBM Plex Sans Condensed", "sans-serif"],
        brutalist: ["Space Grotesk", "Montserrat", "sans-serif"],
      },
      colors: {
        // Eco-Modern Brutalist Palette
        eco: {
          green: "#22C55E",
          cyan: "#00D9FF",
          gold: "#FFD700",
          purple: "#8B5CF6",
          pink: "#EC4899",
          teal: "#4ECDC4",
          yellow: "#FFE66D",
          red: "#FF6B6B",
        },
        electric: {
          blue: "#00D9FF",
          purple: "#A78BFA",
          pink: "#F472B6",
          green: "#4ADE80",
        },
      },
      boxShadow: {
        brutal: "8px 8px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-sm": "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        "brutal-lg": "12px 12px 0px 0px rgba(0, 0, 0, 1)",
        neon: "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3)",
        "neon-green":
          "0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)",
        "neon-pink":
          "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.3)",
        "neon-purple":
          "0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)",
      },
      animation: {
        "glitch-1": "glitch-1 0.5s infinite",
        "glitch-2": "glitch-2 0.5s infinite",
        electric: "electric 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "neon-flicker": "neon-flicker 1.5s infinite alternate",
      },
      keyframes: {
        "glitch-1": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "glitch-2": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(2px, -2px)" },
          "40%": { transform: "translate(2px, 2px)" },
          "60%": { transform: "translate(-2px, -2px)" },
          "80%": { transform: "translate(-2px, 2px)" },
        },
        electric: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "neon-flicker": {
          "0%, 100%": {
            opacity: "1",
            textShadow:
              "0 0 10px rgba(0, 217, 255, 0.8), 0 0 20px rgba(0, 217, 255, 0.6)",
          },
          "50%": {
            opacity: "0.8",
            textShadow:
              "0 0 5px rgba(0, 217, 255, 0.6), 0 0 10px rgba(0, 217, 255, 0.4)",
          },
        },
      },
      borderWidth: {
        6: "6px",
        8: "8px",
      },
    },
  },
  plugins: [],
};
