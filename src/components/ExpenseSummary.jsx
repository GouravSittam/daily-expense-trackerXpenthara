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
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 tracking-tight">
        Expense Summary
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 p-5 sm:p-6 bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-xl">
        <span className="text-white text-base sm:text-lg font-bold uppercase tracking-wide">
          Total Expenses
        </span>
        <span className="text-white text-3xl sm:text-4xl font-black">
          {formatCurrency(totalExpenses)}
        </span>
      </div>

      {categoryArray.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            No expenses yet. Add expenses to see the summary!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {categoryArray.map((item) => (
            <div
              key={item.category}
              className="p-4 sm:p-5 bg-linear-to-br from-gray-50 to-blue-50/20 rounded-2xl hover:shadow-md transition-all border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                <span
                  className={`text-sm sm:text-base font-bold text-white px-4 py-2 rounded-xl shadow-md ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
                <span className="text-xl sm:text-2xl font-black bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {formatCurrency(item.amount)}
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getCategoryColor(
                      item.category
                    )}`}
                    style={{ width: `${getPercentage(item.amount)}%` }}
                  />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-700 min-w-[50px] sm:min-w-[60px] text-right">
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
