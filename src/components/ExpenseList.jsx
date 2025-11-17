import { useState } from 'react';
import { formatCurrency, formatDate, CATEGORIES } from '../utils/constants';

/**
 * Component for displaying and filtering expenses
 * @param {Array} expenses - Array of expense objects
 * @param {Function} onDeleteExpense - Callback function when expense is deleted
 */
const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, amount, category
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc

  /**
   * Filters expenses based on selected filters
   * @returns {Array} Filtered and sorted expenses
   */
  const getFilteredExpenses = () => {
    let filtered = [...expenses];

    // Filter by category
    if (filterCategory !== 'All') {
      filtered = filtered.filter(expense => expense.category === filterCategory);
    }

    // Filter by date range
    if (filterDateFrom) {
      filtered = filtered.filter(expense => expense.date >= filterDateFrom);
    }

    if (filterDateTo) {
      filtered = filtered.filter(expense => expense.date <= filterDateTo);
    }

    // Sort expenses
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'date':
        default:
          comparison = new Date(a.date) - new Date(b.date);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  /**
   * Handles sorting change
   * @param {string} newSortBy - Field to sort by
   */
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  /**
   * Clears all filters
   */
  const clearFilters = () => {
    setFilterCategory('All');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="m-0 text-gray-800 text-2xl font-semibold">Expense List</h2>
        <span className="text-gray-600 text-sm">
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap mb-5 p-4 bg-gray-50 rounded">
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-category" className="text-xs font-medium text-gray-600">
            Category:
          </label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-slate-500"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="filter-date-from" className="text-xs font-medium text-gray-600">
            From:
          </label>
          <input
            type="date"
            id="filter-date-from"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
            className="px-2.5 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-slate-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="filter-date-to" className="text-xs font-medium text-gray-600">
            To:
          </label>
          <input
            type="date"
            id="filter-date-to"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="px-2.5 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-slate-500"
          />
        </div>

        {(filterCategory !== 'All' || filterDateFrom || filterDateTo) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-stone-500 text-white rounded text-sm cursor-pointer transition-colors hover:bg-stone-600 sm:self-end"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 px-6 text-gray-500">
          <p className="m-0 text-base">No expenses found. Add your first expense above!</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center mb-4 p-3 bg-gray-50 rounded">
            <span className="text-sm font-medium text-gray-600 mr-2">Sort by:</span>
            <button
              onClick={() => handleSortChange('date')}
              className={`px-3 py-1.5 rounded text-sm cursor-pointer transition-all border ${
                sortBy === 'date'
                  ? 'bg-slate-600 text-white border-slate-600'
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('amount')}
              className={`px-3 py-1.5 rounded text-sm cursor-pointer transition-all border ${
                sortBy === 'amount'
                  ? 'bg-slate-600 text-white border-slate-600'
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('category')}
              className={`px-3 py-1.5 rounded text-sm cursor-pointer transition-all border ${
                sortBy === 'category'
                  ? 'bg-slate-600 text-white border-slate-600'
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded transition-all hover:bg-gray-100 relative"
              >
                <div className="flex flex-col gap-1 flex-1 mb-2 sm:mb-0">
                  <div className="font-semibold text-slate-700 text-base">{expense.category}</div>
                  <div className="text-gray-600 text-sm">{expense.description}</div>
                  <div className="text-gray-500 text-xs">{formatDate(expense.date)}</div>
                </div>
                <div className="text-xl font-semibold text-amber-700 sm:mr-10 mb-2 sm:mb-0">{formatCurrency(expense.amount)}</div>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="absolute sm:static right-4 top-4 sm:top-auto sm:right-4 sm:transform sm:-translate-y-0 bg-stone-600 text-white rounded-full w-7 h-7 text-xl leading-none cursor-pointer flex items-center justify-center transition-colors hover:bg-stone-700"
                  aria-label="Delete expense"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseList;

