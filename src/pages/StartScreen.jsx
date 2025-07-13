import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import statesData from '../data/statesData'; // YOU MUST POPULATE THIS FILE
import './StartScreen.css'; // Make sure this CSS file exists

const StartScreen = () => {
  const { stateName } = useParams();
  const navigate = useNavigate();
  const { initializeGame, selectedMapState } = useGame();

  // Initialize state safely, defaulting to first state if context/params fail
  const [selectedState, setSelectedState] = useState(() => {
      if (selectedMapState) return selectedMapState;
      if (stateName) {
          const stateFromParam = statesData.find(s => s.name === stateName);
          if (stateFromParam) return stateFromParam;
      }
      // Fallback to the first state in the array if no other match
      return statesData.length > 0 ? statesData[0] : null;
  });

  const [wageType, setWageType] = useState('minimum');
  const [avatarTrait, setAvatarTrait] = useState('balanced');
  const [showIntro, setShowIntro] = useState(true); // Default to showing intro

  // Effect to update selectedState if stateName param changes or selectedMapState changes
  useEffect(() => {
    let stateToSet = null;
     if (selectedMapState) { // Prioritize context state if navigating back from map
        stateToSet = selectedMapState;
    } else if (stateName) { // Use URL param if present
        stateToSet = statesData.find(s => s.name === stateName);
    }

     if (stateToSet && stateToSet.name !== selectedState?.name) {
        setSelectedState(stateToSet);
    } else if (!selectedState && statesData.length > 0) {
        // Default if still no state selected (e.g., direct navigation without param/context)
        setSelectedState(statesData[0]);
    }
  }, [stateName, selectedMapState, selectedState]);


  const handleStartGame = () => {
    if (!selectedState) {
      alert("Error: No state selected. Please go back to the map and choose a state.");
      navigate('/simulation'); // Redirect to map if state is missing
      return;
    }
    // Pass navigate function to initializeGame for internal navigation after state update
    initializeGame(selectedState.name, wageType, navigate);
  };

  const calculateMonthlyIncome = (state, type) => {
    if (!state) return 0;
    if (type === 'minimum') {
      return (state.minWage || 0) * 160; // 40 hours * 4 weeks
    } else {
      return (state.medianBottom50Annual || 0) / 12;
    }
  };

  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  const traits = {
    young: { name: "Young Adult", description: "Higher health, lower starting income.", healthBonus: 20, incomeMultiplier: 0.8 },
    experienced: { name: "Experienced Worker", description: "Higher income, lower health recovery.", healthBonus: -10, incomeMultiplier: 1.2 },
    balanced: { name: "Balanced", description: "Standard starting stats.", healthBonus: 0, incomeMultiplier: 1.0 }
  };

  // Loading or error state if selectedState is somehow null
  if (!selectedState) {
    return (
      <div className="start-screen-container fade-in">
        <p className="loading-message">Loading state information or no state data available...</p>
        <p>Please ensure `statesData.js` is correctly populated.</p>
        <Link to="/simulation" className="button primary" style={{marginTop: '20px'}}>Return to Map</Link>
      </div>
    );
  }

  // Calculate income only if selectedState is valid
  const monthlyIncome = calculateMonthlyIncome(selectedState, wageType);

  return (
    <div className="start-screen-container fade-in">
      <div className="header-section">
        <h1>Cost of Living Simulator</h1>
        <p className="byline">By: Mason Smith</p>
        <p className="tagline">Experience the economic realities of living in different states</p>
      </div>

      {showIntro ? (
        <div className="intro-section">
          <div className="intro-content">
            <h2>About This Simulation</h2>
            <p>
              Welcome to the Cost of Living Simulator - an educational tool designed to help you understand
              the diverse economic conditions across the United States. This simulation uses data (ideally for 2025)
              to create a realistic experience of managing finances in different parts of the country.
            </p>
            <div className="intro-features">
              <div className="feature"><h3>Realistic Economics</h3><p>Experience true-to-life minimum wages, housing costs, and income levels that vary by state. See how far your dollar stretches.</p></div>
              <div className="feature"><h3>Educational Purpose</h3><p>Aims to raise awareness about cost of living differences, economic inequality, and financial literacy in an interactive format.</p></div>
              <div className="feature"><h3>Real-World Challenges</h3><p>Face unexpected expenses, make tough budgeting decisions, and learn how regional economic factors impact daily life.</p></div>
            </div>
            <button className="start-button" onClick={toggleIntro}>Continue to Simulation Setup</button>
          </div>
        </div>
      ) : (
        <div className="setup-section">
          <div className="setup-content">
            <h2>Confirm Your Simulation</h2> {/* Heading changed */}
            <div className="selection-area">
              <div className="state-selection">
                <h3>Choose Your State</h3>
                <select
                  value={selectedState.name}
                  onChange={(e) => {
                    const stateObj = statesData.find(s => s.name === e.target.value);
                    if (stateObj) setSelectedState(stateObj);
                  }}
                >
                  {statesData.map(state => (
                    <option key={state.id || state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <div className="state-preview">
                  <div className="state-info">
                    <h4>{selectedState.name}</h4>
                    <div className="state-metrics">
                      <div className="metric"><span className="metric-label">Population:</span><span className="metric-value">{selectedState.info?.population || 'N/A'}</span></div>
                      <div className="metric"><span className="metric-label">Cost of Living:</span><span className="metric-value">{selectedState.info?.costOfLivingRank || 'N/A'}</span></div>
                      <div className="metric"><span className="metric-label">Minimum Wage:</span><span className="metric-value">${(selectedState.minWage || 0).toFixed(2)}/hr</span></div>
                      <div className="metric"><span className="metric-label">Median Income:</span><span className="metric-value">${Math.round((selectedState.medianBottom50Annual || 0)/1000)}k/year</span></div>
                    </div>
                  </div>
                  <div className="state-summary">{selectedState.info?.summary || 'No summary available.'}</div>
                </div>
              </div>
              <div className="income-selection">
                <h3>Choose Your Income Level</h3>
                <div className="income-options">
                  <button className={`income-option ${wageType === 'minimum' ? 'active' : ''}`} onClick={() => setWageType('minimum')}>
                    <div className="income-option-title">Minimum Wage</div>
                    <div className="income-option-amount">${(selectedState.minWage || 0).toFixed(2)}/hr</div>
                    <div className="income-option-monthly">${Math.round((selectedState.minWage || 0) * 160)}/month</div>
                    <div className="income-option-desc">Experience living on the minimum legal wage in this state.</div>
                  </button>
                  <button className={`income-option ${wageType === 'median' ? 'active' : ''}`} onClick={() => setWageType('median')}>
                    <div className="income-option-title">Median Income</div>
                    <div className="income-option-amount">${Math.round((selectedState.medianBottom50Annual || 0)/1000)}k/year</div>
                    <div className="income-option-monthly">${Math.round((selectedState.medianBottom50Annual || 0)/12)}/month</div>
                    <div className="income-option-desc">Live on the median income for the lower 50% of earners.</div>
                  </button>
                </div>
              </div>
              <div className="trait-selection">
                <h3>Choose Your Avatar Trait</h3>
                <div className="trait-options">
                  {Object.entries(traits).map(([key, trait]) => (
                    <button key={key} className={`trait-option ${avatarTrait === key ? 'active' : ''}`} onClick={() => setAvatarTrait(key)}>
                      <div className="trait-title">{trait.name}</div>
                      <div className="trait-desc">{trait.description}</div>
                      <div className="trait-effects">
                        Health: {trait.healthBonus > 0 ? '+' : ''}{trait.healthBonus}, Income: x{trait.incomeMultiplier.toFixed(1)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="simulation-preview">
              <h3>Simulation Preview</h3>
              <div className="preview-container">
                <div className="preview-stat"><div className="preview-label">Location</div><div className="preview-value">{selectedState.name}</div></div>
                <div className="preview-stat"><div className="preview-label">Income</div><div className="preview-value">${monthlyIncome.toFixed(2)}/month</div></div>
                <div className="preview-stat"><div className="preview-label">Type</div><div className="preview-value">{wageType === 'minimum' ? 'Min Wage' : 'Median'}</div></div>
                <div className="preview-stat"><div className="preview-label">Trait</div><div className="preview-value">{traits[avatarTrait].name}</div></div>
                <div className="preview-stat"><div className="preview-label">Balance</div><div className="preview-value">${monthlyIncome.toFixed(2)}</div></div>
                <div className="preview-stat"><div className="preview-label">Goal</div><div className="preview-value">Survive 52 weeks</div></div>
              </div>
            </div>
            <div className="action-buttons">
              <button className="start-button" onClick={handleStartGame}>Start Simulation</button>
              <button className="back-button" onClick={toggleIntro}>Back to Introduction</button>
            </div>
          </div>
        </div>
      )}
      <div className="footer-section">
        <div className="disclaimer"><strong>Educational Disclaimer:</strong> This simulation is for educational purposes and uses approximated data.</div>
        <div className="navigation-links"><Link to="/simulation" className="link">Back to Map</Link></div>
        <div className="data-sources">Data sources: U.S. Bureau of Labor Statistics, U.S. Census Bureau (Simulated 2025 Data)</div>
      </div>
    </div>
  );
};
export default StartScreen;
