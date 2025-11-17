import { useState } from 'react';
import { formatCurrency, formatDate, CATEGORIES } from '../utils/constants';
import './ExpenseList.css';

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
    <div className="expense-list-container">
      <div className="expense-list-header">
        <h2>Expense List</h2>
        <span className="expense-count">
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="filter-category">Category:</label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-date-from">From:</label>
          <input
            type="date"
            id="filter-date-from"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-date-to">To:</label>
          <input
            type="date"
            id="filter-date-to"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {(filterCategory !== 'All' || filterDateFrom || filterDateTo) && (
          <button onClick={clearFilters} className="clear-filters-button">
            Clear Filters
          </button>
        )}
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="no-expenses">
          <p>No expenses found. Add your first expense above!</p>
        </div>
      ) : (
        <>
          <div className="sort-controls">
            <span>Sort by:</span>
            <button
              onClick={() => handleSortChange('date')}
              className={sortBy === 'date' ? 'active' : ''}
            >
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('amount')}
              className={sortBy === 'amount' ? 'active' : ''}
            >
              Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('category')}
              className={sortBy === 'category' ? 'active' : ''}
            >
              Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>

          <div className="expense-list">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-info">
                  <div className="expense-category">{expense.category}</div>
                  <div className="expense-description">{expense.description}</div>
                  <div className="expense-date">{formatDate(expense.date)}</div>
                </div>
                <div className="expense-amount">
                  {formatCurrency(expense.amount)}
                </div>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="delete-button"
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

