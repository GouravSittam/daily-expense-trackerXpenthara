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
import './ChartComponent.css';

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
    '#3498db',
    '#2ecc71',
    '#e74c3c',
    '#f39c12',
    '#9b59b6',
    '#1abc9c',
    '#e67e22',
    '#95a5a6'
  ];

  /**
   * Custom tooltip for charts
   * @param {Object} props - Tooltip props
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="chart-component-container">
        <h2>Expense Visualization</h2>
        <div className="no-chart-data">
          <p>No data available for visualization. Add expenses to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-component-container">
      <h2>Expense Visualization</h2>
      
      <div className="charts-wrapper">
        <div className="chart-item">
          <h3>Expenses by Category (Pie Chart)</h3>
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
                fill="#8884d8"
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

        <div className="chart-item">
          <h3>Expenses by Category (Bar Chart)</h3>
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
              <Bar dataKey="value" fill="#3498db" radius={[8, 8, 0, 0]}>
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

