import { formatCurrency, getCategoryColor } from "../utils/constants";

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

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
        Expense Summary
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 p-4 sm:p-5 bg-blue-600 rounded-lg mb-5 sm:mb-6 shadow-sm">
        <span className="text-white text-sm sm:text-base font-medium">
          Total Expenses
        </span>
        <span className="text-white text-2xl sm:text-3xl font-bold">
          {formatCurrency(totalExpenses)}
        </span>
      </div>

      {categoryArray.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-6">
          <p className="text-gray-500 text-sm sm:text-base">
            No expenses yet. Add expenses to see the summary!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categoryArray.map((item) => (
            <div
              key={item.category}
              className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3">
                <span
                  className={`text-xs sm:text-sm lg:text-base font-semibold text-white px-2 sm:px-3 py-1 rounded-lg ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
                <span className="text-base sm:text-lg font-bold text-orange-600">
                  {formatCurrency(item.amount)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getCategoryColor(
                      item.category
                    )}`}
                    style={{ width: `${getPercentage(item.amount)}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-600 min-w-[45px] sm:min-w-[50px] text-right">
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
