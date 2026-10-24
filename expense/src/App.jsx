import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";
import Budget from "./components/Budget";
import { ExpenseProvider } from "./context/ExpenseContext";

function Dashboard() {
  return (
    <>
      <Header />

      <main className="container" id="dashboard">
        <section className="welcome-section">
          <div>
            <p className="welcome-label">YOUR FINANCIAL OVERVIEW</p>
            <h1>Welcome to ExpenseEase!</h1>
            <p className="welcome-description">
              Keep your money organized and understand your spending habits.
            </p>
          </div>

          <div className="welcome-date">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </section>

        <SummaryCards />

        <div className="main-grid">
          <div className="left-column">
            <ExpenseForm />
            <TransactionList />
          </div>

          <div className="right-column">
            <Budget />

            <section className="tip-card">
              <div className="tip-icon">✦</div>
              <h3>Money Tip</h3>
              <p>
                Track your daily expenses regularly. Small savings can make
                a big difference over time.
              </p>
            </section>
          </div>
        </div>

        <footer className="footer">
          <p>ExpenseEase · Take control of your money.</p>
        </footer>
      </main>
    </>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <Dashboard />
    </ExpenseProvider>
  );
}

export default App;
