import { useState, useEffect } from "react";
import {
  isOfflineMode,
  syncPendingOperations,
  getPendingSyncCount,
} from "../services/ExpenseService";

/**
 * Component to display offline status and sync information
 * Shows when backend is disconnected and displays pending sync count
 */
const OfflineIndicator = () => {
  const [offline, setOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  /**
   * Updates offline status and pending count
   */
  const updateStatus = () => {
    setOffline(isOfflineMode());
    setPendingCount(getPendingSyncCount());
  };

  /**
   * Attempts to sync pending operations
   */
  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await syncPendingOperations();
      if (result.synced > 0) {
        updateStatus();
      }
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    // Initial status check
    updateStatus();

    // Listen for offline mode changes
    const handleOfflineChange = () => {
      updateStatus();
    };

    window.addEventListener("offlineModeChange", handleOfflineChange);

    // Auto-sync when coming back online
    const handleOnline = async () => {
      console.log("🌐 Network connection restored - attempting sync...");
      await handleSync();
    };

    window.addEventListener("online", handleOnline);

    // Periodic sync check (every 30 seconds)
    const syncInterval = setInterval(async () => {
      if (isOfflineMode() && getPendingSyncCount() > 0) {
        console.log("🔄 Periodic sync check...");
        await handleSync();
      }
    }, 30000);

    return () => {
      window.removeEventListener("offlineModeChange", handleOfflineChange);
      window.removeEventListener("online", handleOnline);
      clearInterval(syncInterval);
    };
  }, []);

  // Don't show anything if online and nothing pending
  if (!offline && pendingCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
      <div
        className={`backdrop-blur-lg rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
          offline
            ? "bg-linear-to-br from-orange-500/90 to-red-500/90 border-orange-400/20"
            : "bg-linear-to-br from-blue-500/90 to-indigo-500/90 border-blue-400/20"
        }`}
      >
        {/* Status Bar */}
        <div className="px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Icon */}
            <div
              className={`shrink-0 p-1.5 sm:p-2 rounded-xl backdrop-blur-sm ${
                syncing
                  ? "bg-white/20"
                  : offline
                  ? "bg-white/10"
                  : "bg-white/20"
              }`}
            >
              {syncing ? (
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : offline ? (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {syncing
                    ? "Syncing Data..."
                    : offline
                    ? "Working Offline"
                    : "All Synced"}
                </p>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-white/20 rounded-full backdrop-blur-sm">
                    {pendingCount}
                  </span>
                )}
              </div>
              {pendingCount > 0 && (
                <p className="text-xs text-white/80 mt-0.5">
                  {pendingCount} {pendingCount === 1 ? "change" : "changes"}{" "}
                  pending
                </p>
              )}
            </div>

            {/* Retry Button */}
            {offline && pendingCount > 0 && !syncing && (
              <button
                onClick={handleSync}
                className="shrink-0 px-3 sm:px-4 py-1.5 text-xs font-medium text-white bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20 touch-manipulation"
              >
                Retry
              </button>
            )}
          </div>
        </div>

        {/* Info Banner */}
        {offline && (
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-black/10 border-t border-white/10">
            <div className="flex items-start gap-2">
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/80 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-white/90 leading-relaxed">
                Your changes are saved locally and will sync automatically when
                you're back online.
              </p>
            </div>
          </div>
        )}

        {/* Success Animation Pulse */}
        {!offline && !syncing && pendingCount === 0 && (
          <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
