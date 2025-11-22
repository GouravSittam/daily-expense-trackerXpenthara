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
    <div className="brutal-card bg-white p-5 sm:p-7 border-6 border-black relative overflow-hidden">
      {/* Electric corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-eco-purple opacity-20 blur-xl"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 sm:mb-6 relative z-10">
        <h2
          className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase"
          style={{
            fontFamily: "Space Grotesk, Montserrat, sans-serif",
            textShadow: "3px 3px 0px rgba(139, 92, 246, 0.3)",
          }}
        >
          <span className="text-eco-purple">📋</span> EXPENSE LIST
        </h2>
        <span className="text-eco-purple text-sm sm:text-base font-black bg-eco-purple/10 px-4 py-2 border-2 border-eco-purple uppercase tracking-wider">
          {filteredExpenses.length}{" "}
          {filteredExpenses.length === 1 ? "expense" : "expenses"}
        </span>
      </div>

      <div className="flex flex-col gap-4 mb-6 p-5 bg-gray-50 border-4 border-black">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label
              htmlFor="filter-category"
              className="text-sm font-bold text-gray-900 tracking-wide uppercase"
            >
              Category
            </label>
            <select
              id="filter-category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black text-base font-bold focus:outline-none focus:border-eco-purple focus:shadow-neon-purple bg-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
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
              className="text-sm font-bold text-gray-900 tracking-wide uppercase"
            >
              From Date
            </label>
            <input
              type="date"
              id="filter-date-from"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black text-base font-bold focus:outline-none focus:border-eco-cyan focus:shadow-neon bg-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            />
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <label
              htmlFor="filter-date-to"
              className="text-sm font-bold text-gray-900 tracking-wide uppercase"
            >
              To Date
            </label>
            <input
              type="date"
              id="filter-date-to"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 border-4 border-black text-base font-bold focus:outline-none focus:border-eco-green focus:shadow-neon-green bg-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            />
          </div>
        </div>

        {(filterCategory !== "All" || filterDateFrom || filterDateTo) && (
          <button
            onClick={clearFilters}
            className="brutal-button w-full sm:w-auto px-6 py-3 bg-eco-red text-white font-black text-base cursor-pointer uppercase tracking-wider hover:bg-eco-red/90 touch-manipulation"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-16 px-6 bg-gray-100 border-4 border-dashed border-black">
          <p className="text-gray-700 text-base sm:text-lg font-bold uppercase">
            📭 No expenses found!
          </p>
          <p className="text-gray-600 text-sm font-medium mt-2">
            Add your first expense above
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-5 p-4 bg-gray-50 border-4 border-black">
            <span className="text-sm font-black text-gray-900 tracking-wide mb-1 sm:mb-0 sm:mr-2 uppercase">
              Sort by:
            </span>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleSortChange("date")}
                className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black transition-all touch-manipulation border-2 uppercase tracking-wider ${
                  sortBy === "date"
                    ? "bg-eco-cyan text-black border-black shadow-brutal-sm"
                    : "bg-white border-black text-gray-900 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
                }`}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("amount")}
                className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black transition-all touch-manipulation border-2 uppercase tracking-wider ${
                  sortBy === "amount"
                    ? "bg-eco-cyan text-black border-black shadow-brutal-sm"
                    : "bg-white border-black text-gray-900 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
                }`}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Amount{" "}
                {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSortChange("category")}
                className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black transition-all touch-manipulation border-2 uppercase tracking-wider ${
                  sortBy === "category"
                    ? "bg-eco-cyan text-black border-black shadow-brutal-sm"
                    : "bg-white border-black text-gray-900 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
                }`}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
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
                  className={`overflow-hidden border-4 transition-all ${
                    isExpanded
                      ? "border-eco-purple shadow-brutal bg-white"
                      : "border-black shadow-brutal-sm bg-white hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(expense.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors cursor-pointer touch-manipulation"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Category Icon */}
                      <div
                        className={`shrink-0 w-14 h-14 border-4 border-black flex items-center justify-center text-white font-black text-lg shadow-brutal-sm uppercase ${getCategoryColor(
                          expense.category
                        )}`}
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {expense.category.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <h3
                          className="text-base sm:text-lg font-black text-gray-900 truncate w-full uppercase tracking-tight"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {expense.description}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap mt-1.5">
                          <span className="text-sm font-bold text-gray-700">
                            {formatDate(expense.date)}
                          </span>
                          {expense._isLocal && (
                            <span className="text-xs px-2 py-1 bg-eco-gold text-black border-2 border-black font-black uppercase tracking-wide">
                              ⚡ Syncing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Amount & Arrow */}
                    <div className="flex items-center gap-4 shrink-0 ml-3">
                      <span
                        className={`text-xl sm:text-2xl font-black ${
                          isExpanded ? "text-eco-purple" : "text-gray-900"
                        }`}
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {formatCurrency(expense.amount)}
                      </span>

                      <div
                        className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${
                          isExpanded
                            ? "bg-eco-purple border-black text-white rotate-180 shadow-brutal-sm"
                            : "bg-white border-black text-gray-900 hover:shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5"
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
                    className={`transition-all ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 pt-3 border-t-4 border-black bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        {/* Category */}
                        <div>
                          <div
                            className="text-xs text-gray-900 font-black uppercase tracking-wider mb-2"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            Category
                          </div>
                          <span
                            className={`inline-flex px-4 py-2 border-2 border-black text-white font-black text-base shadow-brutal-sm uppercase tracking-wide ${getCategoryColor(
                              expense.category
                            )}`}
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            {expense.category}
                          </span>
                        </div>

                        {/* Amount */}
                        <div>
                          <div
                            className="text-xs text-gray-900 font-black uppercase tracking-wider mb-2"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            Amount
                          </div>
                          <div
                            className="text-3xl font-black text-eco-purple"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            {formatCurrency(expense.amount)}
                          </div>
                        </div>

                        {/* Date */}
                        <div>
                          <div
                            className="text-xs text-gray-900 font-black uppercase tracking-wider mb-2"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            Date
                          </div>
                          <div className="text-base font-bold text-gray-800">
                            {formatDate(expense.date)}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <div
                            className="text-xs text-gray-900 font-black uppercase tracking-wider mb-2"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                          >
                            Description
                          </div>
                          <p className="text-base font-bold text-gray-800 leading-relaxed">
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
                        className="brutal-button w-full flex items-center justify-center gap-2 px-6 py-4 bg-eco-red text-white font-black text-base cursor-pointer uppercase tracking-wider hover:bg-eco-red/90 touch-manipulation"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span>🗑️ Delete Expense</span>
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
