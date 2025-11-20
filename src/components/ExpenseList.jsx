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
  const [expandedId, setExpandedId] = useState(null); // Track expanded accordion item

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

  /**
   * Toggles accordion expansion
   */
  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 sm:mb-7">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Expense List
        </h2>
        <span className="text-gray-700 text-sm sm:text-base font-bold bg-blue-100 px-4 py-2 rounded-full border border-blue-200">
          {filteredExpenses.length}{" "}
          {filteredExpenses.length === 1 ? "expense" : "expenses"}
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-6 p-5 bg-linear-to-br from-gray-50 to-blue-50/20 rounded-2xl border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label
              htmlFor="filter-category"
              className="text-sm font-bold text-gray-800 tracking-wide"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all hover:border-gray-400"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label
              htmlFor="filter-date-from"
              className="text-sm font-bold text-gray-800 tracking-wide"
            >
              From Date
            </label>
            <input
              type="date"
              id="filter-date-from"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all hover:border-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label
              htmlFor="filter-date-to"
              className="text-sm font-bold text-gray-800 tracking-wide"
            >
              To Date
            </label>
            <input
              type="date"
              id="filter-date-to"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all hover:border-gray-400"
            />
          </div>
        </div>

        {(filterCategory !== "All" || filterDateFrom || filterDateTo) && (
          <button
            onClick={clearFilters}
            className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-xl text-base font-bold cursor-pointer transition-all hover:bg-gray-900 active:scale-[0.98] shadow-md hover:shadow-lg touch-manipulation"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            No expenses found. Add your first expense above!
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-5 p-4 bg-linear-to-br from-gray-50 to-blue-50/20 rounded-2xl border border-gray-200">
            <span className="text-sm font-bold text-gray-800 tracking-wide mb-1 sm:mb-0 sm:mr-2">
              Sort by:
            </span>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleSortChange("date")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-bold transition-all touch-manipulation ${
                  sortBy === "date"
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-400 active:bg-gray-50"
                }`}
              >
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("amount")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-bold transition-all touch-manipulation ${
                  sortBy === "amount"
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-400 active:bg-gray-50"
                }`}
              >
                Amount{" "}
                {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("category")}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-bold transition-all touch-manipulation ${
                  sortBy === "category"
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-400 active:bg-gray-50"
                }`}
              >
                Category{" "}
                {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {filteredExpenses.map((expense) => {
              const isExpanded = expandedId === expense.id;

              return (
                <div
                  key={expense.id}
                  className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    isExpanded
                      ? "border-blue-500 shadow-xl bg-white"
                      : "border-gray-300 shadow-md bg-white hover:border-blue-400 hover:shadow-lg"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(expense.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-blue-50/40 transition-colors cursor-pointer touch-manipulation"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Category Icon */}
                      <div
                        className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg ${getCategoryColor(
                          expense.category
                        )}`}
                      >
                        {expense.category.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate w-full">
                          {expense.description}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap mt-1.5">
                          <span className="text-sm font-medium text-gray-600">
                            {formatDate(expense.date)}
                          </span>
                          {expense._isLocal && (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                              Syncing...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Amount & Arrow */}
                    <div className="flex items-center gap-4 shrink-0 ml-3">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isExpanded ? "text-blue-600" : "text-gray-900"
                        }`}
                      >
                        {formatCurrency(expense.amount)}
                      </span>

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                          isExpanded
                            ? "bg-blue-600 text-white rotate-180"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 pt-3 border-t-2 border-gray-200 bg-gray-50/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        {/* Category */}
                        <div>
                          <div className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
                            Category
                          </div>
                          <span
                            className={`inline-flex px-4 py-2 rounded-xl text-white font-bold text-base shadow-md ${getCategoryColor(
                              expense.category
                            )}`}
                          >
                            {expense.category}
                          </span>
                        </div>

                        {/* Amount */}
                        <div>
                          <div className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
                            Amount
                          </div>
                          <div className="text-3xl font-black text-orange-600">
                            {formatCurrency(expense.amount)}
                          </div>
                        </div>

                        {/* Date */}
                        <div>
                          <div className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
                            Date
                          </div>
                          <div className="text-base font-bold text-gray-800">
                            {formatDate(expense.date)}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <div className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
                            Description
                          </div>
                          <p className="text-base font-medium text-gray-800 leading-relaxed">
                            {expense.description}
                          </p>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteExpense(expense.id);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-[0.98] text-white rounded-xl transition-all font-bold text-base shadow-lg hover:shadow-xl touch-manipulation"
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
                        <span>Delete Expense</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
