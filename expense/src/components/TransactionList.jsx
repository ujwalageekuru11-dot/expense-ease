import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

function TransactionList() {
  const { transactions, deleteTransaction } = useExpenses();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || transaction.type === filterType;

    return matchesSearch && matchesType;
  });

  function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <section className="panel" id="transactions">
      <div className="section-heading">
        <div>
          <h2>Recent Transactions</h2>
          <p>Manage your income and expenses</p>
        </div>
        <span className="transaction-count">
          {transactions.length} transactions
        </span>
      </div>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search transactions"
        />

        <select
          value={filterType}
          onChange={(event) => setFilterType(event.target.value)}
          aria-label="Filter transactions"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">₹</div>
          <h3>No transactions found</h3>
          <p>Add a transaction or try a different search.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-icon">
                {transaction.type === "income" ? "↙" : "↗"}
              </div>

              <div className="transaction-details">
                <h4>{transaction.title}</h4>
                <p>
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <div className="transaction-right">
                <strong
                  className={
                    transaction.type === "income"
                      ? "income-text"
                      : "expense-text"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </strong>

                <button
                  className="delete-button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this transaction?"
                    );

                    if (confirmed) {
                      deleteTransaction(transaction.id);
                    }
                  }}
                  aria-label={`Delete ${transaction.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
