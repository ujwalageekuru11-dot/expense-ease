function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">E</div>
        <div>
          <h2>ExpenseEase</h2>
          <p>Personal Finance Tracker</p>
        </div>
      </div>

      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#transactions">Transactions</a>
        <a href="#budget">Budget</a>
      </nav>
    </header>
  );
}

export default Header;
