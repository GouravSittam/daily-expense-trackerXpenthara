import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import ChartComponent from "../components/ChartComponent";
import Shuffle from "../components/Shuffle";
import OfflineIndicator from "../components/OfflineIndicator";
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
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Offline Indicator */}
        <OfflineIndicator />

        <header className="text-center mb-6 sm:mb-8 lg:mb-10 py-4 sm:py-6">
          <div className="mb-2 sm:mb-3">
            <Shuffle
              text="💰 Expense Tracker 💰"
              shuffleDirection="right"
              duration={0.8}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power2.inOut"
              stagger={0.05}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              tag="h1"
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-gray-800 px-2"
              style={{
                fontFamily: "inherit",
                textTransform: "none",
                letterSpacing: "-0.02em",
              }}
            />
          </div>
          <p className="text-gray-600 italic text-sm sm:text-base lg:text-lg font-normal px-4">
            Track your daily expenses with ease
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>

          <aside className="flex flex-col">
            <ExpenseSummary
              expensesByCategory={expensesByCategory}
              totalExpenses={totalExpenses}
            />
          </aside>
        </div>

        <ChartComponent expensesByCategory={expensesByCategory} />

        <footer className="mt-8 sm:mt-12 mb-4 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Developed by{" "}
            <a
              href="https://github.com/GouravSittam/trackwise-penthara.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Gourav Chaudhary❤️
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ExpenseTracker;
