import { useState } from "react";
import {
  formatCurrency,
  formatDate,
  CATEGORIES,
  getCategoryColor,
} from "../utils/constants";

/**
 * Component for displaying and filtering expenses
 * @param {Array} expenses - Array of expense objects
 * @param {Function} onDeleteExpense - Callback function when expense is deleted
 */
const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, amount, category
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  /**
   * Filters expenses based on selected filters
   * @returns {Array} Filtered and sorted expenses
   */
  const getFilteredExpenses = () => {
    let filtered = [...expenses];

    // Filter by category
    if (filterCategory !== "All") {
      filtered = filtered.filter(
        (expense) => expense.category === filterCategory
      );
    }

    // Filter by date range
    if (filterDateFrom) {
      filtered = filtered.filter((expense) => expense.date >= filterDateFrom);
    }

    if (filterDateTo) {
      filtered = filtered.filter((expense) => expense.date <= filterDateTo);
    }

    // Sort expenses
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "date":
        default:
          comparison = new Date(a.date) - new Date(b.date);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  };

  /**
   * Handles sorting change
   * @param {string} newSortBy - Field to sort by
   */
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setFilterCategory("All");
    setFilterDateFrom("");
    setFilterDateTo("");
  };

  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Expense List
        </h2>
        <span className="text-gray-600 text-xs sm:text-sm bg-gray-100 px-3 py-1 rounded-full">
          {filteredExpenses.length}{" "}
          {filteredExpenses.length === 1 ? "expense" : "expenses"}
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-5 p-3 sm:p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label
              htmlFor="filter-category"
              className="text-xs font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label
              htmlFor="filter-date-from"
              className="text-xs font-medium text-gray-700"
            >
              From Date
            </label>
            <input
              type="date"
              id="filter-date-from"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label
              htmlFor="filter-date-to"
              className="text-xs font-medium text-gray-700"
            >
              To Date
            </label>
            <input
              type="date"
              id="filter-date-to"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-shadow"
            />
          </div>
        </div>

        {(filterCategory !== "All" || filterDateFrom || filterDateTo) && (
          <button
            onClick={clearFilters}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-gray-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-all hover:bg-gray-700 active:bg-gray-800 shadow-sm touch-manipulation"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 px-6">
          <p className="text-gray-500 text-base">
            No expenses found. Add your first expense above!
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-0 sm:mr-2">
              Sort by:
            </span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleSortChange("date")}
                className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                  sortBy === "date"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("amount")}
                className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                  sortBy === "amount"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                Amount{" "}
                {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("category")}
                className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                  sortBy === "category"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                Category{" "}
                {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-semibold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg text-white ${getCategoryColor(
                        expense.category
                      )}`}
                    >
                      {expense.category}
                    </span>
                    {expense._isLocal && (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                        Syncing...
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 text-sm sm:text-base wrap-break-word">
                    {expense.description}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(expense.date)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200">
                  <div className="text-lg sm:text-xl font-bold text-orange-600">
                    {formatCurrency(expense.amount)}
                  </div>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="p-2.5 sm:p-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors touch-manipulation"
                    aria-label="Delete expense"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
