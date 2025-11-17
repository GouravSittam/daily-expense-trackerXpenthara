import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ChartComponent from '../components/ChartComponent';
import Shuffle from '../components/Shuffle';
import {
  getExpenses,
  addExpense as addExpenseService,
  deleteExpense as deleteExpenseService,
  getExpensesByCategory,
  getTotalExpenses
} from '../services/ExpenseService';

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
    <div className="max-w-[1400px] mx-auto p-6">
      <header className="text-center mb-8">
        <div className="mb-2">
          <Shuffle
            text="💰 Expense Tracker"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={3}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            tag="h1"
            className="text-gray-800 !text-5xl !leading-tight"
            style={{ 
              fontFamily: 'inherit',
              textTransform: 'none',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}
          />
        </div>
        <p className="text-gray-800 italic !text-3xl !leading-tight">Track your daily expenses with category summaries</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">
        <div className="flex flex-col gap-6">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>

        <aside className="flex flex-col">
          <ExpenseSummary
            expensesByCategory={expensesByCategory}
            totalExpenses={totalExpenses}
          />
        </aside>
      </div>

      <ChartComponent expensesByCategory={expensesByCategory} />

      <footer className="mt-12 mb-4 text-right">
        <p className="text-sm text-gray-600">
          Developed by{' '}
          <a
            href="https://github.com/GouravSittam/daily-expense-trackerXpenthara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
          >
            Gourav Chaudhary❤️
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ExpenseTracker;

