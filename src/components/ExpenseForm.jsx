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
    <div className="brutal-card bg-white p-5 sm:p-7 border-6 border-black relative overflow-hidden">
      {/* Electric corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-eco-cyan opacity-20 blur-xl"></div>

      <h2
        className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 sm:mb-6 tracking-tight uppercase"
        style={{
          fontFamily: "Space Grotesk, Montserrat, sans-serif",
          textShadow: "3px 3px 0px rgba(0, 217, 255, 0.3)",
        }}
      >
        <span className="text-eco-cyan">ADD</span> NEW EXPENSE
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mb-2.5 font-bold text-gray-900 text-sm tracking-wide uppercase"
          >
            Amount <span className="text-eco-red">*</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full px-4 py-3 border-4 text-base font-bold focus:outline-none transition-all ${
              errors.amount
                ? "border-eco-red bg-red-50 shadow-brutal-sm"
                : "border-black bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm focus:border-eco-cyan focus:shadow-neon"
            }`}
            placeholder="0.00"
            style={{ fontFamily: "Space Grotesk, monospace" }}
          />
          {errors.amount && (
            <span className="text-eco-red text-xs mt-1 font-bold">
              {errors.amount}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2.5 font-bold text-gray-900 text-sm tracking-wide uppercase"
          >
            Category <span className="text-eco-red">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-4 py-3 border-4 text-base font-bold focus:outline-none bg-white transition-all ${
              errors.category
                ? "border-eco-red bg-red-50"
                : "border-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm focus:border-eco-purple focus:shadow-neon-purple"
            }`}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-eco-red text-xs mt-1 font-bold">
              {errors.category}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="mb-2.5 font-bold text-gray-900 text-sm tracking-wide uppercase"
          >
            Date <span className="text-eco-red">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`px-4 py-3 border-4 text-base font-bold focus:outline-none transition-all ${
              errors.date
                ? "border-eco-red bg-red-50"
                : "border-black bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm focus:border-eco-green focus:shadow-neon-green"
            }`}
            max={new Date().toISOString().split("T")[0]}
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          />
          {errors.date && (
            <span className="text-eco-red text-xs mt-1 font-bold">
              {errors.date}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2.5 font-bold text-gray-900 text-sm tracking-wide uppercase"
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
            className="px-4 py-3 border-4 border-black text-base font-bold focus:outline-none focus:border-eco-pink focus:shadow-neon-pink bg-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-sm"
            placeholder="Add a note..."
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          />
        </div>

        <button
          type="submit"
          className="brutal-button col-span-1 sm:col-span-2 lg:col-span-4 px-8 py-4 bg-eco-cyan text-black text-lg font-black cursor-pointer hover:bg-eco-green active:scale-[0.98] touch-manipulation uppercase tracking-wider"
          style={{ fontFamily: "Space Grotesk, Montserrat, sans-serif" }}
        >
          ⚡ Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
