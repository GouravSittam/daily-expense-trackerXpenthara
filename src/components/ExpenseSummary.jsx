import { formatCurrency } from '../utils/constants';
import './ExpenseSummary.css';

/**
 * Component for displaying expense summary by category
 * @param {Object} expensesByCategory - Object with category as key and total as value
 * @param {number} totalExpenses - Total amount of all expenses
 */
const ExpenseSummary = ({ expensesByCategory, totalExpenses }) => {
  // Convert to array and sort by amount (descending)
  const categoryArray = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  /**
   * Calculates percentage of total for a category
   * @param {number} amount - Category amount
   * @returns {number} Percentage value
   */
  const getPercentage = (amount) => {
    if (totalExpenses === 0) return 0;
    return (amount / totalExpenses) * 100;
  };

  /**
   * Gets color for category based on index
   * @param {number} index - Index in array
   * @returns {string} Color class name
   */
  const getCategoryColor = (index) => {
    const colors = [
      'color-primary',
      'color-secondary',
      'color-success',
      'color-warning',
      'color-danger',
      'color-info',
      'color-purple',
      'color-orange'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="expense-summary-container">
      <h2>Expense Summary</h2>
      
      <div className="total-expenses">
        <span className="total-label">Total Expenses:</span>
        <span className="total-amount">{formatCurrency(totalExpenses)}</span>
      </div>

      {categoryArray.length === 0 ? (
        <div className="no-categories">
          <p>No expenses yet. Add expenses to see the summary!</p>
        </div>
      ) : (
        <div className="category-list">
          {categoryArray.map((item, index) => (
            <div key={item.category} className="category-item">
              <div className="category-header">
                <span className={`category-name ${getCategoryColor(index)}`}>
                  {item.category}
                </span>
                <span className="category-amount">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              
              <div className="category-percentage">
                <div className="percentage-bar">
                  <div
                    className={`percentage-fill ${getCategoryColor(index)}`}
                    style={{ width: `${getPercentage(item.amount)}%` }}
                  />
                </div>
                <span className="percentage-text">
                  {getPercentage(item.amount).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;

