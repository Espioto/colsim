import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-container fade-in">
      <header className="about-header">
        <h1>About This Simulation</h1>
        <p>An interactive tool for financial literacy.</p>
      </header>

      <main className="about-content">
        <section className="about-section">
          <h2>Realistic Economics</h2>
          <p>
            This simulation uses real-world data to model the financial challenges and opportunities you might face in different parts of the United States.
          </p>
        </section>

        <section className="about-section">
          <h2>Educational Purpose</h2>
          <p>
            Our primary goal is to provide an engaging way to learn about personal finance, including budgeting, saving, and the impact of major life events.
          </p>
        </section>

        <section className="about-section">
          <h2>Real-World Challenges</h2>
          <p>
            You'll encounter random events that can either help or hinder your financial progress, just like in real life. Your ability to adapt and make sound decisions is key to success.
          </p>
        </section>

        <div className="about-actions">
          <Link to="/simulation" className="button primary">Continue to Map</Link>
          <Link to="/" className="button secondary">Back to Home</Link>
        </div>
      </main>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Cost of Living Simulator. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
