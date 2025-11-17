import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ChartComponent from '../components/ChartComponent';
import {
  getExpenses,
  addExpense as addExpenseService,
  deleteExpense as deleteExpenseService,
  getExpensesByCategory,
  getTotalExpenses
} from '../services/ExpenseService';
import './ExpenseTracker.css';

/**
 * Main Expense Tracker page component
 * Manages state and coordinates between child components
 */
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  /**
   * Loads expenses from service and updates state
   */
  const loadExpenses = () => {
    const loadedExpenses = getExpenses();
    setExpenses(loadedExpenses);
    setExpensesByCategory(getExpensesByCategory());
    setTotalExpenses(getTotalExpenses());
  };

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * Handles adding a new expense
   * @param {Object} expense - Expense object to add
   */
  const handleAddExpense = (expense) => {
    addExpenseService(expense);
    loadExpenses(); // Reload to update all state
  };

  /**
   * Handles deleting an expense
   * @param {string} id - Expense id to delete
   */
  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpenseService(id);
      loadExpenses(); // Reload to update all state
    }
  };

  return (
    <div className="expense-tracker">
      <header className="expense-tracker-header">
        <h1>💰 Expense Tracker</h1>
        <p className="subtitle">Track your daily expenses with category summaries</p>
      </header>

      <div className="expense-tracker-content">
        <div className="expense-tracker-main">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>

        <aside className="expense-tracker-sidebar">
          <ExpenseSummary
            expensesByCategory={expensesByCategory}
            totalExpenses={totalExpenses}
          />
        </aside>
      </div>

      <ChartComponent expensesByCategory={expensesByCategory} />
    </div>
  );
};

export default ExpenseTracker;

