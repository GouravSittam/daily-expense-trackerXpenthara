/**
 * Constants used throughout the application
 */

/**
 * Available expense categories
 * @type {Array<string>}
 */
export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Healthcare',
  'Education',
  'Other'
];

/**
 * Get contextual color for a category
 * Colors that relate to the category meaning
 * @param {string} category - Category name
 * @returns {string} Tailwind CSS color class
 */
export const getCategoryColor = (category) => {
  const colorMap = {
    'Food': 'bg-orange-500',           // Warm orange for food/appetite
    'Transport': 'bg-blue-500',        // Blue for movement/transport
    'Shopping': 'bg-pink-500',         // Pink for retail/shopping
    'Bills': 'bg-red-500',             // Red for urgent bills
    'Entertainment': 'bg-purple-500',  // Purple for fun/entertainment
    'Healthcare': 'bg-green-500',      // Green for health
    'Education': 'bg-indigo-500',      // Indigo for knowledge/learning
    'Other': 'bg-gray-500'             // Gray for neutral/other
  };
  return colorMap[category] || 'bg-gray-500';
};

/**
 * Get contextual color hex for charts
 * @param {string} category - Category name
 * @returns {string} Hex color code
 */
export const getCategoryColorHex = (category) => {
  const colorMap = {
    'Food': '#f97316',           // orange-500
    'Transport': '#3b82f6',      // blue-500
    'Shopping': '#ec4899',       // pink-500
    'Bills': '#ef4444',          // red-500
    'Entertainment': '#a855f7',  // purple-500
    'Healthcare': '#22c55e',     // green-500
    'Education': '#6366f1',      // indigo-500
    'Other': '#6b7280'           // gray-500
  };
  return colorMap[category] || '#6b7280';
};

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

