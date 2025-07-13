import React from 'react';
import { Link } from 'react-router-dom';
import './DonatePage.css';

const DonatePage = () => {
  return (
    <div className="donate-page-container fade-in">
      <header className="donate-header">
        <h1>Support Affordability Initiatives</h1>
        <p>These organizations are working to make living costs more manageable for everyone.</p>
      </header>

      <main className="donate-content">
        <section className="donate-section">
          <h2>Organizations Making a Difference</h2>
          <p>
            While this simulator is for educational purposes, many real-world organizations are dedicated to helping individuals and families navigate the challenges of the cost of living. Consider supporting their vital work:
          </p>
          <ul className="ways-to-give">
            <li>
              <strong><a href="https://www.habitat.org/" target="_blank" rel="noopener noreferrer">Habitat for Humanity</a></strong>
              <p>Focuses on building, rehabilitating, and preserving homes; advocating for fair and just housing policies; and providing training and access to resources to help families improve their housing conditions.</p>
            </li>
            <li>
              <strong><a href="https://www.feedingamerica.org/" target="_blank" rel="noopener noreferrer">Feeding America</a></strong>
              <p>The largest hunger-relief organization in the United States. They work with a nationwide network of food banks to rescue food and distribute it to people facing hunger.</p>
            </li>
            <li>
              <strong><a href="https://www.unitedway.org/" target="_blank" rel="noopener noreferrer">United Way Worldwide</a></strong>
              <p>Works to improve lives by mobilizing the caring power of communities around the world to advance the common good. Their focus areas often include education, income, and health, addressing root causes of poverty.</p>
            </li>
            <li>
              <strong><a href="https://www.consumercredit.com/" target="_blank" rel="noopener noreferrer">National Foundation for Credit Counseling (NFCC)</a></strong>
              <p>A non-profit organization dedicated to helping consumers take control of their financial lives. They provide free or low-cost financial counseling and education.</p>
            </li>
            <li>
              <strong><a href="https://www.modestneeds.org/" target="_blank" rel="noopener noreferrer">Modest Needs</a></strong>
              <p>Offers short-term financial assistance to individuals and families who are working and live just above the poverty line, but still can't afford to pay for an unexpected or emergency expense.</p>
            </li>
          </ul>
          <p className="thank-you-note">
            Your support, whether through donations or volunteering, can make a significant difference in someone's life.
          </p>
        </section>

        <div className="donate-actions">
          <Link to="/" className="button secondary">Back to Home</Link>
        </div>
      </main>

      <footer className="donate-footer">
        <p>&copy; {new Date().getFullYear()} Cost of Living Simulator. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default DonatePage;
