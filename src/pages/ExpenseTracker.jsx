import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import ChartComponent from "../components/ChartComponent";
import Shuffle from "../components/Shuffle";
import OfflineIndicator from "../components/OfflineIndicator";
import LightRays from "../components/LightRays";
import Navbar from "../components/Navbar";
import {
  getExpenses,
  addExpense as addExpenseService,
  deleteExpense as deleteExpenseService,
  getExpensesByCategory,
  getTotalExpenses,
} from "../services/ExpenseService";

/**
 * Main Expense Tracker page component
 * Manages state and coordinates between child components
 */
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  /**
   * Loads expenses from service and updates state
   */
  const loadExpenses = async () => {
    try {
      const loadedExpenses = await getExpenses();
      const categoryData = await getExpensesByCategory();
      const total = await getTotalExpenses();

      setExpenses(loadedExpenses);
      setExpensesByCategory(categoryData);
      setTotalExpenses(total);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * Handles adding a new expense
   * @param {Object} expense - Expense object to add
   */
  const handleAddExpense = async (expense) => {
    try {
      await addExpenseService(expense);
      await loadExpenses(); // Reload to update all state
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  /**
   * Handles deleting an expense
   * @param {string} id - Expense id to delete
   */
  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpenseService(id);
        await loadExpenses(); // Reload to update all state
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* LightRays Background */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gray-900/10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#2563eb"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.08}
          distortion={0.02}
          fadeDistance={1.2}
          saturation={0.5}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        {/* Offline Indicator */}
        <OfflineIndicator />

        {/* Add spacing for navbar */}
        <div className="pt-20 sm:pt-24"></div>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div id="add-expense">
              <ExpenseForm onAddExpense={handleAddExpense} />
            </div>
            <div id="expense-list">
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            </div>
          </div>

          <aside className="flex flex-col" id="summary">
            <ExpenseSummary
              expensesByCategory={expensesByCategory}
              totalExpenses={totalExpenses}
            />
          </aside>
        </div>

        <div id="analytics">
          <ChartComponent expensesByCategory={expensesByCategory} />
        </div>

        {/* Footer */}
        <footer
          className="mt-12 xs:mt-14 sm:mt-16 md:mt-20 border-t border-gray-200/50 backdrop-blur-sm"
          style={{
            fontFamily: "IBM Plex Sans Condensed, sans-serif",
            WebkitBackdropFilter: "blur(4px)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="py-6 xs:py-7 sm:py-8 md:py-10 px-3 xs:px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-7 sm:gap-8 mb-6 xs:mb-7 sm:mb-8">
              {/* About Section */}
              <div className="text-center sm:text-left lg:text-left">
                <h3
                  className="text-lg xs:text-xl font-medium text-gray-900 mb-2 xs:mb-3 flex items-center justify-center sm:justify-start gap-1.5 xs:gap-2 select-none"
                  style={{ fontWeight: "500", letterSpacing: "-0.01em" }}
                >
                  <span className="text-xl xs:text-2xl">💰</span>
                  <span>Expense Tracker</span>
                </h3>
                <p
                  className="text-gray-600 text-xs xs:text-sm leading-relaxed font-light px-2 sm:px-0"
                  style={{ fontWeight: "300" }}
                >
                  A modern expense tracking application designed to help you
                  manage your daily finances with ease and efficiency.
                </p>
              </div>

              {/* Quick Links */}
              <div className="text-center sm:text-right lg:text-center">
                <h3
                  className="text-base xs:text-lg font-medium text-gray-900 mb-2 xs:mb-3 select-none"
                  style={{ fontWeight: "500", letterSpacing: "-0.01em" }}
                >
                  Features
                </h3>
                <ul
                  className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm text-gray-600 font-light"
                  style={{ fontWeight: "300" }}
                >
                  <li className="hover:text-blue-600 active:text-blue-700 transition-colors cursor-default select-none">
                    📊 Visual Analytics
                  </li>
                  <li className="hover:text-blue-600 active:text-blue-700 transition-colors cursor-default select-none">
                    📱 Responsive Design
                  </li>
                  <li className="hover:text-blue-600 active:text-blue-700 transition-colors cursor-default select-none">
                    🔒 Secure & Private
                  </li>
                  <li className="hover:text-blue-600 active:text-blue-700 transition-colors cursor-default select-none">
                    ⚡ Real-time Updates
                  </li>
                </ul>
              </div>

              {/* Connect Section */}
              <div className="text-center sm:col-span-2 lg:col-span-1 lg:text-right">
                <h3
                  className="text-base xs:text-lg font-medium text-gray-900 mb-2 xs:mb-3 select-none"
                  style={{ fontWeight: "500", letterSpacing: "-0.01em" }}
                >
                  Connect
                </h3>
                <div className="flex flex-col gap-2 xs:gap-2.5 sm:gap-3 items-center lg:items-end">
                  <a
                    href="https://github.com/GouravSittam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 xs:gap-2 text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors text-xs xs:text-sm group font-light touch-manipulation min-h-11"
                    style={{
                      fontWeight: "400",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <svg
                      className="w-4 h-4 xs:w-5 xs:h-5 group-hover:scale-110 group-active:scale-95 transition-transform"
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
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gouravsittam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 xs:gap-2 text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors text-xs xs:text-sm group font-light touch-manipulation min-h-11"
                    style={{
                      fontWeight: "400",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <svg
                      className="w-4 h-4 xs:w-5 xs:h-5 group-hover:scale-110 group-active:scale-95 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="https://x.com/Gouravv_c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 xs:gap-2 text-gray-700 hover:text-blue-600 active:text-blue-700 transition-colors text-xs xs:text-sm group font-light touch-manipulation min-h-11"
                    style={{
                      fontWeight: "400",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <svg
                      className="w-4 h-4 xs:w-5 xs:h-5 group-hover:scale-110 group-active:scale-95 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter / X</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/50 pt-4 xs:pt-5 sm:pt-6">
              <div
                className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4 text-xs xs:text-sm text-gray-600 font-light"
                style={{ fontWeight: "300" }}
              >
                <p className="text-center sm:text-left select-none">
                  © {new Date().getFullYear()} Expense Tracker. All rights
                  reserved.
                </p>
                <p className="text-center sm:text-right">
                  Made with{" "}
                  <span className="text-red-500 inline-block animate-pulse select-none">
                    ❤️
                  </span>{" "}
                  by{" "}
                  <a
                    href="https://github.com/GouravSittam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 active:text-blue-800 hover:underline transition-all font-medium touch-manipulation"
                    style={{
                      fontWeight: "500",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    Gourav Chaudhary
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ExpenseTracker;
