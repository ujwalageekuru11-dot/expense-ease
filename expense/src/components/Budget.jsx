import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

function Budget() {
  const { budget, updateBudget, totalExpenses } = useExpenses();
  const [newBudget, setNewBudget] = useState(String(budget));

  const percentage =
    budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 0;

  const remaining = budget - totalExpenses;

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(newBudget);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Please enter a budget greater than zero.");
      return;
    }

    updateBudget(amount);
  }

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <section className="panel budget-panel" id="budget">
      <div className="section-heading">
        <div>
          <h2>Monthly Budget</h2>
          <p>Keep track of your monthly spending</p>
        </div>
      </div>

      <div className="budget-numbers">
        <div>
          <p>Budget Limit</p>
          <h3>{formatAmount(budget)}</h3>
        </div>
        <div>
          <p>Total Spent</p>
          <h3>{formatAmount(totalExpenses)}</h3>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${percentage >= 100 ? "over-budget" : ""}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="budget-status">
        <span>{percentage.toFixed(0)}% used</span>
        <span className={remaining < 0 ? "expense-text" : "income-text"}>
          {remaining < 0
            ? `${formatAmount(Math.abs(remaining))} over budget`
            : `${formatAmount(remaining)} remaining`}
        </span>
      </div>

      {totalExpenses > budget && (
        <p className="budget-warning">
          You have exceeded your monthly budget!
        </p>
      )}

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budgetAmount">Set Monthly Budget (₹)</label>
          <input
            id="budgetAmount"
            type="number"
            min="1"
            step="0.01"
            value={newBudget}
            onChange={(event) => setNewBudget(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          Update Budget
        </button>
      </form>
    </section>
  );
}

export default Budget;
