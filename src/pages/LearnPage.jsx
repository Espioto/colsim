import React from 'react';
import { Link } from 'react-router-dom';
import './LearnPage.css';

const LearnPage = () => {
  return (
    <div className="learn-page-container fade-in">
      <header className="learn-header">
        <h1>Learn About Cost of Living & Financial Literacy</h1>
        <p>Understanding the factors that influence your financial well-being and how to manage your money effectively.</p>
      </header>

      <main className="learn-content">
        <section className="learn-section">
          <h2>What is Cost of Living?</h2>
          <p>
            The cost of living is the amount of money needed to cover basic expenses such as housing, food, taxes, and healthcare in a certain place and time period.
            It's often used to compare how expensive it is to live in one city versus another.
          </p>
        </section>

        <section className="learn-section">
          <h2>Key Cost of Living Factors</h2>
          <ul>
            <li><strong>Housing:</strong> Typically the largest expense, varying wildly by location. This includes rent or mortgage, utilities, and maintenance.</li>
            <li><strong>Transportation:</strong> Costs for owning a car (fuel, insurance, maintenance) or using public transport (bus, train fares).</li>
            <li><strong>Food:</strong> Groceries and dining out expenses. This can vary based on dietary choices and local food prices.</li>
            <li><strong>Healthcare:</strong> Insurance premiums, deductibles, co-pays, and out-of-pocket medical costs.</li>
            <li><strong>Taxes:</strong> Income tax, sales tax, and property taxes differ by state and locality, significantly impacting disposable income.</li>
            <li><strong>Childcare:</strong> A major expense for families with young children, including daycare, preschool, or after-school care.</li>
            <li><strong>Education:</strong> Costs for higher education, vocational training, or skill development, including tuition, books, and supplies.</li>
          </ul>
        </section>

        <section className="learn-section">
          <h2>Basic Financial Literacy</h2>
          <h3>Budgeting: Your Financial Roadmap</h3>
          <p>
            Budgeting is the process of creating a plan to spend and save your money. It helps you understand where your money goes and ensures you don't spend more than you earn.
            A good budget includes tracking income, fixed expenses (like rent), and variable expenses (like groceries).
          </p>
          <h3>Saving: Building Your Future</h3>
          <p>
            Saving money is crucial for financial security. It allows you to build an emergency fund for unexpected expenses, save for large purchases (like a house or car), and plan for retirement.
            Even small, consistent savings can grow significantly over time due to compounding.
          </p>
          <h3>Debt Management: Using Credit Wisely</h3>
          <p>
            Debt can be a useful tool (e.g., for a mortgage or education), but it can also become a burden if not managed properly. Understanding interest rates, making timely payments, and avoiding unnecessary high-interest debt are key.
            Prioritizing high-interest debts for repayment can save you a lot of money.
          </p>
          <h3>Investing: Making Your Money Work for You</h3>
          <p>
            Once you have a solid financial foundation (emergency fund, manageable debt), investing can help your money grow faster than inflation.
            Options include stocks, bonds, mutual funds, and real estate. It's important to understand the risks and diversify your investments.
          </p>
        </section>

        <section className="learn-section">
          <h2>Why Financial Literacy Matters?</h2>
          <p>
            Understanding the cost of living and basic financial principles can help you make informed decisions about:
          </p>
          <ul>
            <li>Where to live and work to maximize your financial well-being.</li>
            <li>Negotiating salaries and understanding compensation packages.</li>
            <li>Effective budgeting and long-term financial planning.</li>
            <li>Achieving financial independence and a secure retirement.</li>
          </ul>
          <p>
            This simulation aims to give you a practical sense of these financial realities and empower you with knowledge.
          </p>
        </section>

        <div className="learn-actions">
          <Link to="/simulation" className="button primary">Try the Simulation</Link>
          <Link to="/" className="button secondary">Back to Home</Link>
        </div>
      </main>

      <footer className="learn-footer">
        <p>&copy; {new Date().getFullYear()} Cost of Living Simulator. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default LearnPage;
