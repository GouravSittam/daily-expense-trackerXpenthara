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
  CartesianGrid
} from 'recharts';
import { formatCurrency } from '../utils/constants';

/**
 * Component for visualizing expense data with charts
 * @param {Object} expensesByCategory - Object with category as key and total as value
 */
const ChartComponent = ({ expensesByCategory }) => {
  // Convert to array format for charts
  const chartData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Colors for the charts
  const COLORS = [
    '#475569', // slate-600
    '#78716c', // stone-600
    '#059669', // emerald-600
    '#d97706', // amber-600
    '#e11d48', // rose-600
    '#0891b2', // cyan-600
    '#7c3aed', // violet-600
    '#ea580c'  // orange-600
  ];

  /**
   * Custom tooltip for charts
   * @param {Object} props - Tooltip props
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded p-2 shadow-md">
          <p className="m-0 mb-1 font-semibold text-gray-800 text-sm">{payload[0].name}</p>
          <p className="m-0 text-gray-600 text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md mt-6">
        <h2 className="mt-0 mb-6 text-gray-800 text-2xl font-semibold">Expense Visualization</h2>
        <div className="text-center py-12 px-6 text-gray-500">
          <p className="m-0 text-base">No data available for visualization. Add expenses to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mt-6">
      <h2 className="mt-0 mb-6 text-gray-800 text-2xl font-semibold">Expense Visualization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <h3 className="m-0 mb-4 text-gray-600 text-lg font-semibold">Expenses by Category (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#475569"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col">
          <h3 className="m-0 mb-4 text-gray-600 text-lg font-semibold">Expenses by Category (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#475569" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
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

