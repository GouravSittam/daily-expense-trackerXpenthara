import { useState } from 'react';
import { CATEGORIES } from '../utils/constants';
import './ExpenseForm.css';

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
    <div className="expense-form-container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">
            Amount <span className="required">*</span>
          </label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={errors.amount ? 'error' : ''}
            placeholder="0.00"
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={errors.category ? 'error' : ''}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'error' : ''}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
          />
        </div>

        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

