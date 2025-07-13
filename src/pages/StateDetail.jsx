import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import statesData from '../data/statesData'; // YOU MUST POPULATE THIS FILE
import baselineExpenses from '../data/baselineExpenses';
import { useGame } from '../context/GameContext';
import './StateDetail.css'; // Make sure this CSS file exists

const StateDetail = () => {
  const { stateName } = useParams();
  const { initializeGame } = useGame(); // Assuming you might want to start game from here

  const [stateData, setStateData] = useState(null);
  const [selectedIncomeType, setSelectedIncomeType] = useState('minimum'); // 'minimum' or 'median'
  const [compareState, setCompareState] = useState(null);

  useEffect(() => {
    const foundState = statesData.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    setStateData(foundState);
    // Reset comparison when state changes
    setCompareState(null);
  }, [stateName]);

  const calculateMonthlyIncome = (state, type) => {
    if (!state) return 0;
    return type === 'minimum' ? (state.minWage || 0) * 160 : (state.medianBottom50Annual || 0) / 12;
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const getHousingCost = (state, housingKey) => {
    if (!state || !state.costIndices || !baselineExpenses.housing[housingKey]) return 0;
    return (baselineExpenses.housing[housingKey].rent || 0) * (state.costIndices.housingIndex || 1);
  };

  const getWeeklyCost = (state, category, optionKey) => {
    if (!state || !state.costIndices || !baselineExpenses[category] || !baselineExpenses[category][optionKey]) return 0;
    const categoryData = baselineExpenses[category];
    let baseCost = 0;
    if (typeof categoryData[optionKey] === 'number') { // For food like structure
        baseCost = categoryData[optionKey];
    } else if (categoryData[optionKey]?.cost) { // For healthcare/entertainment like structure
        baseCost = categoryData[optionKey].cost;
    } else if (categoryData[optionKey]?.baseCost) { // For education like structure
        baseCost = categoryData[optionKey].baseCost * (state.costIndices.educationCostIndex || 1);
        return baseCost; // Education is already scaled, return directly
    } else if (categoryData[optionKey]?.weeklyCost) { // For transportation
        baseCost = categoryData[optionKey].weeklyCost;
         // Transportation might not need costIndex scaling, or define its own
        return baseCost;
    }

    const costIndexKey = `${category}Index`; // e.g. foodIndex, healthcareIndex (not always present)
    return baseCost * (state.costIndices[costIndexKey] || 1); // Default to 1 if specific index not found
  };

  const getMonthlyUtilities = (state) => {
    if (!state || !state.costIndices || !baselineExpenses.amenities) return 0;
    let total = 0;
    total += (baselineExpenses.amenities.basicUtilitiesPerMonth || 0) * (state.costIndices.utilitiesIndex || 1);
    total += baselineExpenses.amenities.internetPerMonth || 0;
    total += baselineExpenses.amenities.cellPhonePerMonth || 0;
    return total;
  };


  if (!stateData) {
    return <div className="loading-message state-detail-container">Loading state details or state not found... Please ensure <strong>statesData.js</strong> is populated.</div>;
  }

  const monthlyIncome = calculateMonthlyIncome(stateData, selectedIncomeType);
  const monthlyUtilities = getMonthlyUtilities(stateData);

  const comparisonData = compareState ? {
    monthlyIncome: calculateMonthlyIncome(compareState, selectedIncomeType),
    housingLow: getHousingCost(compareState, 'roommate'),
    housingMid: getHousingCost(compareState, 'averageApartment'),
    foodLow: getWeeklyCost(compareState, 'food', 'basic') * 4.33,
    foodMid: getWeeklyCost(compareState, 'food', 'medium') * 4.33,
    utilities: getMonthlyUtilities(compareState),
    transportation: getWeeklyCost(compareState, 'transportation', 'publicTransit') * 4.33
  } : null;

  return (
    <div className="state-detail-container fade-in">
      <header className="state-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/images/state-banners/${stateData.abbreviation.toLowerCase()}.jpg')`}}>
        <h1>{stateData.name}</h1>
        <p className="state-subtitle">Cost of Living & Income Profile (Simulated 2025)</p>
      </header>

      <div className="content-area">
        <section className="card state-summary">
          <h3>State Overview</h3>
          <p>{stateData.info.summary || "No summary available."}</p>
          <p><strong>Population:</strong> {stateData.info.population || "N/A"} | <strong>Cost of Living Rank:</strong> {stateData.info.costOfLivingRank || "N/A"}</p>
        </section>

        <section className="card income-selector">
          <h3>Select Income Level to Analyze</h3>
          <div className="income-options">
            <div className={`income-option ${selectedIncomeType === 'minimum' ? 'active' : ''}`} onClick={() => setSelectedIncomeType('minimum')}>
              <div className="income-option-title">Minimum Wage</div>
              <div className="income-option-amount">${(stateData.minWage || 0).toFixed(2)}/hr</div>
              <div className="income-option-monthly">${(calculateMonthlyIncome(stateData, 'minimum')).toFixed(0)}/month</div>
            </div>
            <div className={`income-option ${selectedIncomeType === 'median' ? 'active' : ''}`} onClick={() => setSelectedIncomeType('median')}>
              <div className="income-option-title">Median Income (Bottom 50%)</div>
              <div className="income-option-amount">${Math.round((stateData.medianBottom50Annual || 0)/1000)}k/year</div>
              <div className="income-option-monthly">${(calculateMonthlyIncome(stateData, 'median')).toFixed(0)}/month</div>
            </div>
          </div>
        </section>

        <section className="card cost-breakdown">
          <h3>Estimated Monthly Expenses for {selectedIncomeType === 'minimum' ? 'Minimum Wage Earner' : 'Median Income Earner'}</h3>
          <p>Based on national averages, adjusted for <strong>{stateData.name}'s</strong> cost indices. Current Income: <strong>{formatCurrency(monthlyIncome)}/month</strong>.</p>

          <div className="cost-category">
            <h4><span className="category-icon">🏠</span>Housing (Rent - Apartment)</h4>
            <div className="housing-options">
              {Object.entries(baselineExpenses.housing).slice(0,3).map(([key, option]) => { // Show first 3 options
                  const cost = getHousingCost(stateData, key);
                  const percentOfIncome = monthlyIncome > 0 ? (cost / monthlyIncome * 100) : 0;
                  return(
                      <div key={key} className="housing-option">
                          <h5>{formatChoice(key)}</h5> {/* Shorten desc */}
                          <div className="housing-details">
                            <div className="housing-rent">{formatCurrency(cost)}</div>
                            <div className={`housing-percent ${percentOfIncome > 30 ? 'warning' : 'good'}`}>{percentOfIncome.toFixed(1)}% of income</div>
                          </div>
                          <div className="housing-impact">
                              {option.happinessImpact !== 0 && <span className={option.happinessImpact > 0 ? 'positive' : 'negative'}>Happiness {option.happinessImpact > 0 ? '+' : ''}{option.happinessImpact} </span>}
                              {option.healthImpact !== 0 && <span className={option.healthImpact > 0 ? 'positive' : 'negative'}>Health {option.healthImpact > 0 ? '+' : ''}{option.healthImpact}</span>}
                          </div>
                      </div>
                  )
              })}
            </div>
          </div>

          <div className="cost-category">
            <h4><span className="category-icon">🍎</span>Food (Weekly, then x4.33 for Monthly Est.)</h4>
            <div className="cost-options">
                {Object.entries(baselineExpenses.food).filter(([key]) => key !== 'descriptions').slice(0,3).map(([key, weeklyBaseCost]) => {
                    const cost = getWeeklyCost(stateData, 'food', key) * 4.33;
                    const percentOfIncome = monthlyIncome > 0 ? (cost / monthlyIncome * 100) : 0;
                    return(
                        <div key={key} className="cost-option">
                            <div className="cost-option-name">{formatChoice(key)}</div>
                            <div className="cost-option-amount">{formatCurrency(cost)}/month</div>
                            <div className={`cost-percent ${percentOfIncome > 15 ? 'warning' : ''}`}>{percentOfIncome.toFixed(1)}% of income</div>
                            <div className="cost-description">{baselineExpenses.food.descriptions[key].split('.')[0]}</div>
                        </div>
                    )
                })}
            </div>
          </div>
            <div className="cost-category">
                <h4><span className="category-icon">💡</span>Utilities (Monthly)</h4>
                <div className="utilities-cost">
                    <div className="utility-item"><span>Basic Utilities (Electric, Gas, Water)</span><span>{formatCurrency((baselineExpenses.amenities.basicUtilitiesPerMonth || 0) * (stateData.costIndices.utilitiesIndex || 1))}</span></div>
                    <div className="utility-item"><span>Internet</span><span>{formatCurrency(baselineExpenses.amenities.internetPerMonth || 0)}</span></div>
                    <div className="utility-item"><span>Cell Phone</span><span>{formatCurrency(baselineExpenses.amenities.cellPhonePerMonth || 0)}</span></div>
                    <div className="utility-item total"><span>Total Utilities</span><span>{formatCurrency(monthlyUtilities)}</span></div>
                </div>
            </div>
        </section>

        <section className="card comparison-section">
          <h3>Compare with Another State</h3>
          <div className="compare-selector">
            <select onChange={(e) => setCompareState(statesData.find(s => s.name === e.target.value) || null)} value={compareState?.name || ""}>
              <option value="">Select a state to compare</option>
              {statesData.filter(s => s.name !== stateData.name).map(s => <option key={s.id || s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          {compareState && comparisonData && (
            <div className="comparison-chart">
              <div className="comparison-header">
                <div className="comparison-state">{stateData.name}</div>
                <div>Metric</div>
                <div className="comparison-state">{compareState.name}</div>
              </div>
              <div className="comparison-row"><div className="comparison-value">{formatCurrency(monthlyIncome)}</div><div className="comparison-label">Monthly Income</div><div className="comparison-value">{formatCurrency(comparisonData.monthlyIncome)}</div></div>
              <div className="comparison-row"><div className="comparison-value">{formatCurrency(getHousingCost(stateData, 'averageApartment'))}</div><div className="comparison-label">Avg Housing (Rent)</div><div className="comparison-value">{formatCurrency(comparisonData.housingMid)}</div></div>
              <div className="comparison-row"><div className="comparison-value">{formatCurrency(getWeeklyCost(stateData, 'food', 'medium')*4.33)}</div><div className="comparison-label">Avg Food (Month)</div><div className="comparison-value">{formatCurrency(comparisonData.foodMid)}</div></div>
              <div className="comparison-row"><div className="comparison-value">{formatCurrency(monthlyUtilities)}</div><div className="comparison-label">Utilities (Month)</div><div className="comparison-value">{formatCurrency(comparisonData.utilities)}</div></div>
               {/* Add more comparison rows as needed */}
            </div>
          )}
        </section>

        <section className="card action-buttons">
          <h3>Start Simulation</h3>
          <Link to={`/start/${stateData.name}`} className="start-button">Start in {stateData.name}</Link>
          <Link to="/simulation" className="back-button">Back to Map</Link>
        </section>

        <section className="card educational-note">
            <h4>Understanding the Numbers</h4>
            <p>These estimates provide a general idea of costs. Actual expenses can vary based on lifestyle, family size, and specific location within the state. Income figures represent gross income before taxes and other deductions.</p>
            <p>The "Cost of Living Rank" and "Housing Index" (where 1.0 is national average) give a quick comparison point.</p>
        </section>
      </div>
    </div>
  );
};

export default StateDetail;