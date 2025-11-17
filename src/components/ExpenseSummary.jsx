import { formatCurrency } from '../utils/constants';

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
   * Gets color classes for category based on index
   * @param {number} index - Index in array
   * @returns {string} Tailwind color classes
   */
  const getCategoryColor = (index) => {
    const colors = [
      'bg-slate-600',
      'bg-stone-600',
      'bg-emerald-600',
      'bg-amber-600',
      'bg-rose-600',
      'bg-cyan-600',
      'bg-violet-600',
      'bg-orange-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="mt-0 mb-5 text-gray-800 text-2xl font-semibold">Expense Summary</h2>
      
      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg mb-6 shadow-md">
        <span className="text-white text-lg font-medium">Total Expenses:</span>
        <span className="text-white text-3xl font-bold">{formatCurrency(totalExpenses)}</span>
      </div>

      {categoryArray.length === 0 ? (
        <div className="text-center py-12 px-6 text-gray-500">
          <p className="m-0 text-base">No expenses yet. Add expenses to see the summary!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {categoryArray.map((item, index) => (
            <div
              key={item.category}
              className="p-4 bg-gray-50 rounded transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`text-base font-semibold text-white px-3 py-1 rounded-full ${getCategoryColor(index)}`}>
                  {item.category}
                </span>
                <span className="text-lg font-semibold text-amber-700">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getCategoryColor(index)}`}
                    style={{ width: `${getPercentage(item.amount)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 min-w-[45px] text-right">
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

