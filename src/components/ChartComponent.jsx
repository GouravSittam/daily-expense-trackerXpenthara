import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  formatCurrency,
  CATEGORIES,
  getCategoryColorHex,
} from "../utils/constants";

/**
 * Component for visualizing expense data with charts
 * @param {Object} expensesByCategory - Object with category as key and total as value
 */
const ChartComponent = ({ expensesByCategory }) => {
  // Convert to array format for charts
  const chartData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Get contextual colors based on category names
  const getColorForCategory = (categoryName) => {
    return getCategoryColorHex(categoryName);
  };

  /**
   * Custom tooltip for charts
   * @param {Object} props - Tooltip props
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-md">
          <p className="m-0 mb-1 font-semibold text-gray-800 text-sm">
            {payload[0].name}
          </p>
          <p className="m-0 text-orange-600 text-base font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Expense Visualization
        </h2>
        <div className="text-center py-8 sm:py-12 px-4 sm:px-6">
          <p className="text-gray-500 text-sm sm:text-base">
            No data available for visualization. Add expenses to see charts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Expense Visualization
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="flex flex-col">
          <h3 className="mb-3 sm:mb-4 text-gray-700 text-base sm:text-lg font-semibold">
            Expenses by Category (Pie Chart)
          </h3>
          <ResponsiveContainer width="100%" height={280} minHeight={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={window.innerWidth < 640 ? 80 : 100}
                fill={
                  chartData.length > 0
                    ? getColorForCategory(chartData[0].name)
                    : "#6b7280"
                }
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorForCategory(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-3 sm:mb-4 text-gray-700 text-base sm:text-lg font-semibold">
            Expenses by Category (Bar Chart)
          </h3>
          <ResponsiveContainer width="100%" height={280} minHeight={250}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={window.innerWidth < 640 ? -90 : -45}
                textAnchor="end"
                height={window.innerWidth < 640 ? 100 : 80}
                fontSize={window.innerWidth < 640 ? 10 : 12}
              />
              <YAxis fontSize={window.innerWidth < 640 ? 10 : 12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={
                  chartData.length > 0
                    ? getColorForCategory(chartData[0].name)
                    : "#6b7280"
                }
                radius={[8, 8, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getColorForCategory(entry.name)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
