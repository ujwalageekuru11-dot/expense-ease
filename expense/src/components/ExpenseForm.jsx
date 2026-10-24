import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

function ExpenseForm() {
  const { addTransaction } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  function handleSubmit(event) {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !title.trim() ||
      numericAmount <= 0 ||
      !Number.isFinite(numericAmount)
    ) {
      alert("Please enter a valid name and amount.");
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: numericAmount,
      category: type === "income" ? "Income" : category,
      type,
      date,
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("expense");
    setDate(new Date().toLocaleDateString("en-CA"));
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Add Transaction</h2>
          <p>Record your income or expenses</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Transaction Name</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Grocery shopping"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {type === "expense" && (
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-button">
          + Add Transaction
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;
