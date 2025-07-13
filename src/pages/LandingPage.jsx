import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Make sure this CSS file exists or remove import

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-content">
        <div className="globe-container">
          <div className="globe">
            <div className="globe-sphere"><div className="globe-worldmap"></div></div>
            <div className="globe-shadow"></div>
          </div>
        </div>
        <h1 className="landing-title">The Cost of Living Simulation</h1>
        <p className="landing-subtitle">By: Mason Smith</p>
        <p className="landing-description">
          Experience the financial realities of living in different states across America.
          Choose your location, income level, and navigate daily expenses to understand
          how economic factors impact everyday life.
        </p>
        <div className="landing-actions">
          <Link to="/about" className="play-button">
            <span className="play-icon">▶</span>
            <span className="play-text">Start Simulation</span>
          </Link>
        </div>
        
      </div>
      <footer className="landing-footer">
        <p>Using real data from 2025 to create an educational experience about financial literacy and economic awareness.</p>
        <p>Data sources: U.S. Bureau of Labor Statistics, U.S. Census Bureau, Bureau of Economic Analysis</p>
      </footer>
    </div>
  );
};
export default LandingPage;
