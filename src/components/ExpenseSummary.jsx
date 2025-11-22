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

  /**
   * Gets eco badge color based on category
   */
  const getEcoBadgeStyle = (category) => {
    const styles = {
      Food: "bg-eco-green text-black",
      Transport: "bg-eco-cyan text-black",
      Entertainment: "bg-eco-pink text-black",
      Shopping: "bg-eco-purple text-black",
      Bills: "bg-eco-yellow text-black",
      Health: "bg-eco-teal text-black",
      Education: "bg-eco-gold text-black",
      Other: "bg-eco-red text-black",
    };
    return styles[category] || "bg-gray-700 text-black";
  };

  return (
    <div className="brutal-card bg-white p-5 sm:p-7 border-6 border-black relative overflow-hidden">
      {/* Electric corner accent */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-eco-green opacity-20 blur-xl"></div>

      <h2
        className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 sm:mb-6 tracking-tight uppercase relative z-10"
        style={{
          fontFamily: "Space Grotesk, Montserrat, sans-serif",
          textShadow: "3px 3px 0px rgba(34, 197, 94, 0.3)",
        }}
      >
        <span className="text-eco-green">💰</span> EXPENSE SUMMARY
      </h2>

      {/* Total Expenses - Brutalist Card */}
      <div className="relative mb-6">
        <div
          className="p-5 sm:p-6 bg-white border-4 border-black shadow-brutal"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
          }}
        >
          <span className="block text-gray-900 text-base sm:text-lg font-black uppercase tracking-wide mb-2">
            Total Expenses
          </span>
          <span className="block text-eco-cyan text-3xl sm:text-4xl font-black">
            {formatCurrency(totalExpenses)}
          </span>

          {/* Achievement Badge */}
          {totalExpenses > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-eco-gold text-black px-3 py-1 border-2 border-black font-bold text-xs uppercase">
              <span>⭐</span>
              <span>Tracking Active</span>
            </div>
          )}
        </div>
        {/* Brutal shadow element */}
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-black -z-10"></div>
      </div>

      {categoryArray.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4 sm:px-6 bg-gray-100 border-4 border-dashed border-black">
          <p className="text-gray-700 text-base sm:text-lg font-bold uppercase">
            🎯 No expenses yet!
          </p>
          <p className="text-gray-600 text-sm font-medium mt-2">
            Start tracking to see your summary
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {categoryArray.map((item, index) => (
            <div
              key={item.category}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-4 sm:p-5 bg-white border-4 border-black hover:shadow-brutal-sm hover:-translate-y-1 transition-all relative overflow-hidden">
                {/* Category percentage indicator background */}
                <div
                  className={`absolute inset-0 opacity-10 ${getEcoBadgeStyle(
                    item.category
                  )} transition-all duration-500`}
                  style={{ width: `${getPercentage(item.amount)}%` }}
                ></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 relative z-10">
                  <span
                    className={`eco-badge ${getEcoBadgeStyle(
                      item.category
                    )} font-black text-sm uppercase`}
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.category}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-gray-900">
                    {formatCurrency(item.amount)}
                  </span>
                </div>

                {/* Progress bar - Brutalist style */}
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="flex-1 h-4 bg-gray-200 border-2 border-black overflow-hidden relative">
                    <div
                      className={`h-full ${getEcoBadgeStyle(
                        item.category
                      )} transition-all duration-500 border-r-2 border-black`}
                      style={{ width: `${getPercentage(item.amount)}%` }}
                    >
                      {/* Electric effect */}
                      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-black text-gray-900 min-w-[50px] sm:min-w-[60px] text-right border-2 border-black px-2 py-1 bg-white">
                    {getPercentage(item.amount).toFixed(1)}%
                  </span>
                </div>

                {/* Rank badge for top spender */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-eco-gold text-black px-2 py-1 border-2 border-black font-black text-xs uppercase rotate-12 shadow-brutal-sm">
                    🏆 TOP
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gamification Footer */}
      {categoryArray.length > 0 && (
        <div className="mt-6 p-4 bg-white border-4 border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-eco-cyan">
                  Categories Tracked
                </p>
                <p className="text-lg font-black text-gray-900">
                  {categoryArray.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-eco-green">
                  Expenses Logged
                </p>
                <p className="text-lg font-black text-gray-900">
                  {Object.values(expensesByCategory).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseSummary;
