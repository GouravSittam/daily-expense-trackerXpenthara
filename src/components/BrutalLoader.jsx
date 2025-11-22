/**
 * Brutal Loader Component
 * A themed loader matching the project's brutalist design
 */
const BrutalLoader = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Brutal Box */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-black bg-eco-cyan animate-brutal-spin`}
          style={{
            boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
          }}
        >
          <div className="absolute inset-2 bg-eco-purple animate-brutal-pulse"></div>
          <div className="absolute inset-4 bg-eco-green animate-brutal-spin-reverse"></div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p
          className="text-sm font-black text-gray-900 uppercase tracking-wider animate-pulse"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            textShadow: "2px 2px 0px rgba(0, 217, 255, 0.3)",
          }}
        >
          {text}
        </p>
      )}

      {/* Animated Dots */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-eco-cyan border-2 border-black animate-brutal-bounce"></div>
        <div
          className="w-3 h-3 bg-eco-purple border-2 border-black animate-brutal-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-eco-green border-2 border-black animate-brutal-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes brutal-spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes brutal-spin-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes brutal-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.9);
          }
        }

        @keyframes brutal-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-brutal-spin {
          animation: brutal-spin 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)
            infinite;
        }

        .animate-brutal-spin-reverse {
          animation: brutal-spin-reverse 1.5s linear infinite;
        }

        .animate-brutal-pulse {
          animation: brutal-pulse 1.5s ease-in-out infinite;
        }

        .animate-brutal-bounce {
          animation: brutal-bounce 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BrutalLoader;
