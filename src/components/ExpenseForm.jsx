import { useState } from 'react';
import { CATEGORIES } from '../utils/constants';

/**
 * Component for adding new expenses
 * @param {Function} onAddExpense - Callback function when expense is added
 */
const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * Validates the form data
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const expense = {
      amount: parseFloat(amount),
      category,
      date,
      description: description.trim() || `${category} Expense`
    };

    onAddExpense(expense);

    // Reset form
    setAmount('');
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setErrors({});
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h2 className="mt-0 mb-5 text-gray-800 text-2xl font-semibold">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2 font-medium text-gray-600 text-sm">
            Amount <span className="text-orange-600">*</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`px-3 py-2.5 border rounded text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 ${
              errors.amount ? 'border-orange-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.amount && <span className="text-orange-600 text-xs mt-1">{errors.amount}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium text-gray-600 text-sm">
            Category <span className="text-orange-600">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-3 py-2.5 border rounded text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 ${
              errors.category ? 'border-orange-500' : 'border-gray-300'
            }`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="text-orange-600 text-xs mt-1">{errors.category}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 font-medium text-gray-600 text-sm">
            Date <span className="text-orange-600">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`px-3 py-2.5 border rounded text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 ${
              errors.date ? 'border-orange-500' : 'border-gray-300'
            }`}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <span className="text-orange-600 text-xs mt-1">{errors.date}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-medium text-gray-600 text-sm">
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
            placeholder="Add a description..."
          />
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 lg:col-span-4 px-6 py-3 bg-slate-700 text-white rounded text-base font-medium cursor-pointer transition-colors hover:bg-slate-800 active:scale-95"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

