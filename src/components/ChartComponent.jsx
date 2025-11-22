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
        <div className="bg-white border-4 border-black p-3 sm:p-4 shadow-brutal">
          <p
            className="m-0 mb-1.5 font-black text-gray-900 text-sm sm:text-base uppercase tracking-wide"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {payload[0].name}
          </p>
          <p
            className="m-0 text-eco-cyan text-lg sm:text-xl font-black"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="brutal-card bg-white p-5 sm:p-7 border-6 border-black mt-6">
        <div
          className="electric-border"
          style={{ borderColor: "#00D9FF" }}
        ></div>
        <div className="flex items-center gap-3 mb-5 sm:mb-7">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-eco-cyan border-4 border-black flex items-center justify-center shadow-brutal-sm">
            <span className="text-2xl sm:text-3xl">📊</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Expense Visualization
          </h2>
        </div>
        <div className="text-center py-12 sm:py-16 px-4 sm:px-6 bg-gray-100 border-4 border-dashed border-black">
          <p className="text-gray-700 text-base sm:text-lg font-bold uppercase">
            📈 No data available! Add expenses to see charts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="brutal-card bg-white p-4 sm:p-6 lg:p-8 border-6 border-black mt-6">
      <div className="electric-border" style={{ borderColor: "#00D9FF" }}></div>
      <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-eco-cyan border-4 border-black flex items-center justify-center shadow-brutal-sm">
          <span className="text-2xl sm:text-3xl">📊</span>
        </div>
        <h2
          className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight uppercase"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Expense Visualization
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
        <div className="flex flex-col bg-gray-50 p-4 sm:p-5 lg:p-6 border-4 border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 transition-all">
          <h3
            className="mb-3 sm:mb-4 lg:mb-5 text-gray-900 text-base sm:text-lg lg:text-xl font-black tracking-tight text-center uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            🥧 Category Distribution
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

        <div className="flex flex-col bg-gray-50 p-4 sm:p-5 lg:p-6 border-4 border-black shadow-brutal-sm hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 transition-all">
          <h3
            className="mb-3 sm:mb-4 lg:mb-5 text-gray-900 text-base sm:text-lg lg:text-xl font-black tracking-tight text-center uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            📊 Amount Comparison
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
