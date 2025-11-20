import { useState } from "react";
import { CATEGORIES } from "../utils/constants";

/**
 * Component for adding new expenses
 * @param {Function} onAddExpense - Callback function when expense is added
 */
const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  /**
   * Validates the form data
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (!date) {
      newErrors.date = "Please select a date";
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
      description: description.trim() || `${category} Expense`,
    };

    onAddExpense(expense);

    // Reset form
    setAmount("");
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-lg border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 tracking-tight">
        Add New Expense
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mb-2.5 font-semibold text-gray-800 text-sm tracking-wide"
          >
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.amount
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
            placeholder="0.00"
          />
          {errors.amount && (
            <span className="text-red-500 text-xs mt-1">{errors.amount}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2.5 font-semibold text-gray-800 text-sm tracking-wide"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-4 py-3 border-2 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all ${
              errors.category
                ? "border-red-400 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-xs mt-1">{errors.category}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="mb-2.5 font-semibold text-gray-800 text-sm tracking-wide"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`px-4 py-3 border-2 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.date
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.date && (
            <span className="text-red-500 text-xs mt-1">{errors.date}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2.5 font-semibold text-gray-800 text-sm tracking-wide"
          >
            Description{" "}
            <span className="text-gray-500 text-xs font-medium">
              (Optional)
            </span>
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all hover:border-gray-400"
            placeholder="Add a note..."
          />
        </div>

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 lg:col-span-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-lg font-bold cursor-pointer hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl touch-manipulation"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
