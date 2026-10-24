import { useExpenses } from "../context/ExpenseContext";

function SummaryCards() {
  const { totalIncome, totalExpenses, balance } = useExpenses();

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <section className="summary-grid">
      <div className="summary-card balance-card">
        <p>Available Balance</p>
        <h2>{formatAmount(balance)}</h2>
        <span>Your current balance</span>
      </div>

      <div className="summary-card income-card">
        <p>Total Income</p>
        <h2>{formatAmount(totalIncome)}</h2>
        <span>Money received</span>
      </div>

      <div className="summary-card expense-card">
        <p>Total Expenses</p>
        <h2>{formatAmount(totalExpenses)}</h2>
        <span>Money spent</span>
      </div>
    </section>
  );
}

export default SummaryCards;
