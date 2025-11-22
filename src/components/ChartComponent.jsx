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
        <div className="bg-white border-2 border-gray-300 rounded-xl p-3 sm:p-4 shadow-xl">
          <p className="m-0 mb-1.5 font-bold text-gray-900 text-sm sm:text-base">
            {payload[0].name}
          </p>
          <p className="m-0 text-orange-600 text-lg sm:text-xl font-black">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-gray-200 mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-7 tracking-tight">
          Expense Visualization
        </h2>
        <div className="text-center py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            No data available for visualization. Add expenses to see charts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 mt-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 tracking-tight text-center sm:text-left">
        Expense Visualization
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        <div className="flex flex-col bg-linear-to-br from-gray-50 to-blue-50/20 rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-3 sm:mb-4 lg:mb-5 text-gray-900 text-base sm:text-lg lg:text-xl font-bold tracking-tight text-center">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  const pct = (percent * 100).toFixed(0);
                  return window.innerWidth < 640
                    ? `${pct}%`
                    : `${name}: ${pct}%`;
                }}
                outerRadius={
                  window.innerWidth < 640
                    ? 70
                    : window.innerWidth < 1024
                    ? 85
                    : 100
                }
                innerRadius={window.innerWidth < 640 ? 0 : 40}
                paddingAngle={2}
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
              <Legend
                wrapperStyle={{
                  fontSize: window.innerWidth < 640 ? "12px" : "14px",
                }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col bg-linear-to-br from-gray-50 to-blue-50/20 rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="mb-3 sm:mb-4 lg:mb-5 text-gray-900 text-base sm:text-lg lg:text-xl font-bold tracking-tight text-center">
            Amount Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: window.innerWidth < 640 ? 5 : 15,
                left: window.innerWidth < 640 ? -10 : 0,
                bottom: window.innerWidth < 640 ? 80 : 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                angle={window.innerWidth < 640 ? -90 : -45}
                textAnchor="end"
                height={window.innerWidth < 640 ? 90 : 70}
                fontSize={
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 11
                    : 12
                }
                tick={{ fill: "#374151", fontWeight: 500 }}
                interval={0}
              />
              <YAxis
                fontSize={
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 11
                    : 12
                }
                tick={{ fill: "#374151", fontWeight: 500 }}
                width={window.innerWidth < 640 ? 40 : 50}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
              />
              <Bar
                dataKey="value"
                fill={
                  chartData.length > 0
                    ? getColorForCategory(chartData[0].name)
                    : "#6b7280"
                }
                radius={[8, 8, 0, 0]}
                maxBarSize={window.innerWidth < 640 ? 40 : 60}
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
