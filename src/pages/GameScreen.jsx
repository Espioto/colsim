import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from "../context/GameContext";
import baselineExpenses from "../data/baselineExpenses";
import { formatChoice } from "../utils/utils";
import "./GameScreen.css";

function GameScreen() {
  const {
    playerState,
    nextWeek,
    chooseHousing,
    chooseFoodOption,
    chooseEntertainment,
    chooseHealthcare,
    chooseEducation,
    chooseTransportation,
    addDependent,
    removeDependent,
    takeLoan,
  setSavingsAllocation,
  depositToSavings,
  withdrawFromSavings,
  withdrawFromInvestment,
  chooseInvestment,
  makeInvestment,
  toggleSideHustle, // New function from context
  applyWellbeing,   // New function from context
} = useGame();

  const [selectedAction, setSelectedAction] = useState(null); // To manage which action panel is open
  const [investmentInput, setInvestmentInput] = useState(0);
  const [withdrawInput, setWithdrawInput] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true); // Show tutorial by default

  // Loan form inputs
  const [loanAmount, setLoanAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(0.05); // Annual rate (e.g., 5%)
  const [monthlyPayment, setMonthlyPayment] = useState(200);

  const [savingsInput, setSavingsInput] = useState(0);

  // Savings form input
  const [allocationInput, setAllocationInput] = useState(playerState.monthlySavingsAllocation || 0);

  // Actions array with new additions
  const actions = [
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "food", label: "Food", icon: "🍎" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "transportation", label: "Transport", icon: "🚗" },
    { id: "entertainment", label: "Entertainment", icon: "🎮" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "sideHustle", label: "Side Hustle", icon: "💼" },
    { id: "wellbeing", label: "Wellbeing", icon: "🧘" },
    { id: "family", label: "Family", icon: "👪" },
    { id: "savings", label: "Savings", icon: "🏦" },
    { id: "loans", label: "Loans", icon: "💰" },
    { id: "investments", label: "Investments", icon: "📈" },
  ];

  // Update local allocation input when context state changes
  useEffect(() => {
    setAllocationInput(playerState.monthlySavingsAllocation);
  }, [playerState.monthlySavingsAllocation]);

  const handleNextWeek = () => {
    nextWeek();
  };

  const getBarColor = (value) => {
    if (value >= 80) return "excellent";
    if (value >= 60) return "good";
    if (value >= 40) return "fair";
    if (value >= 20) return "poor";
    return "critical";
  };

  const handleActionSelect = (actionId) => {
    setSelectedAction(actionId === selectedAction ? null : actionId);
  };

  const handleOptionSelect = (key, optionType) => {
    if (optionType === "education") {
      console.log(`handleOptionSelect called for education: key=${key}, optionType=${optionType}`);
    }
    switch (optionType) {
      case "housing": chooseHousing(key); break;
      case "food": chooseFoodOption(key); break;
      case "healthcare": chooseHealthcare(key); break;
      case "entertainment": chooseEntertainment(key); break;
      case "education": chooseEducation(key); break;
      case "transportation": chooseTransportation(key); break;
      case "investments": chooseInvestment(key); break;
      default: console.warn("Unknown option type:", optionType); break;
    }
  };

  const handleTakeLoan = () => {
    if (!loanAmount || loanAmount <= 0 || !interestRate || interestRate < 0 || !monthlyPayment || monthlyPayment <= 0) {
      alert("Please enter valid loan details (amount > 0, rate >= 0, payment > 0).");
      return;
    }
    const minPayment = (loanAmount * interestRate) / 12;
    if (interestRate > 0 && monthlyPayment <= minPayment) {
      alert(`Monthly payment (${formatCurrency(monthlyPayment)}) must be greater than the first month's interest (${formatCurrency(minPayment)}) to reduce principal.`);
      return;
    }
    takeLoan(loanAmount, interestRate, monthlyPayment);
    setLoanAmount(1000); // Reset form
    setInterestRate(0.05);
    setMonthlyPayment(200);
  };

  const handleSetAllocation = () => {
    const amount = Number(allocationInput);
    if (isNaN(amount) || amount < 0) {
      alert("Please enter a valid non-negative amount for savings allocation.");
      return;
    }
    setSavingsAllocation(amount);
  };

  const handleSavingsAction = (action) => {
    const amount = Number(savingsInput);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    if (action === "deposit") {
      depositToSavings(amount);
    } else if (action === "withdraw") {
      withdrawFromSavings(amount);
    }

    setSavingsInput(0); // Reset input
  };

  const calculateMonthlyExpenses = () => {
    const { location, housingChoice, chosenFoodOption, healthcareOption, educationOption, entertainmentOption, transportationOption, dependents, loans, currentWeek, inflationRate } = playerState;
    if (!location?.costIndices) return { weekly: 0, monthly: 0, total: 0 };
    const indices = location.costIndices;

    // Calculate inflation factor based on current week (assuming inflation applies monthly)
    const monthsPassed = Math.floor(currentWeek / 4);
    const inflationFactor = Math.pow(1 + (inflationRate / 12), monthsPassed);

    let weeklyTotal = 0;
    if (chosenFoodOption && baselineExpenses.food[chosenFoodOption]) weeklyTotal += (baselineExpenses.food[chosenFoodOption] || 0) * (indices.foodIndex || 1);
    if (healthcareOption && healthcareOption !== "none" && baselineExpenses.healthcare[healthcareOption]) weeklyTotal += baselineExpenses.healthcare[healthcareOption].cost || 0;
    if (entertainmentOption && entertainmentOption !== "none" && baselineExpenses.entertainment[entertainmentOption]) weeklyTotal += baselineExpenses.entertainment[entertainmentOption].cost || 0;
    if (educationOption && educationOption !== "none" && baselineExpenses.education[educationOption]) weeklyTotal += (baselineExpenses.education[educationOption].baseCost || 0) * (indices.educationCostIndex || 1);
    if (transportationOption && baselineExpenses.transportation[transportationOption]) weeklyTotal += baselineExpenses.transportation[transportationOption].weeklyCost || 0;
    if (dependents > 0 && baselineExpenses.family?.costPerDependent) weeklyTotal += (baselineExpenses.family.costPerDependent || 0) * dependents;

    let monthlyTotal = 0;
    if (housingChoice && baselineExpenses.housing[housingChoice]) monthlyTotal += (baselineExpenses.housing[housingChoice].rent || 0) * (indices.housingIndex || 1);
    if (baselineExpenses.amenities) {
      monthlyTotal += (baselineExpenses.amenities.basicUtilitiesPerMonth || 0) * (indices.utilitiesIndex || 1);
      monthlyTotal += baselineExpenses.amenities.internetPerMonth || 0;
      monthlyTotal += baselineExpenses.amenities.cellPhonePerMonth || 0;
    }
    monthlyTotal += (loans || []).reduce((total, loan) => total + (loan?.monthlyPayment || 0), 0);

    // Apply inflation to all calculated expenses
    weeklyTotal *= inflationFactor;
    monthlyTotal *= inflationFactor;

    const averageWeekly = weeklyTotal + (monthlyTotal / 4.33); // More precise weekly average
    return { weekly: weeklyTotal, monthly: monthlyTotal, total: averageWeekly };
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) amount = 0;
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  // --- Render Functions for Options ---
  const renderHousingOptions = () => { if (!baselineExpenses.housing || !playerState.location?.costIndices) return <p>Housing data unavailable.</p>; return Object.entries(baselineExpenses.housing).map(([key, option]) => { if (!option) return null; const cost = (option.rent || 0) * playerState.location.costIndices.housingIndex; const isSelected = playerState.housingChoice === key; return ( <div key={`housing-${key}`} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "housing")} role="button" tabIndex={0} aria-pressed={isSelected}> <div className="option-header"><h4>{formatChoice(key)}</h4>{isSelected && <span className="selected-badge">Current</span>}</div><div className="option-details"><div className="option-cost"><strong>{formatCurrency(cost)}</strong><span className="option-percent"> /month</span></div><div className="option-effects">{option.happinessImpact !== undefined && (<div className={`option-effect ${option.happinessImpact >= 0 ? "positive" : "negative"}`}>Happiness: {option.happinessImpact >= 0 ? "+" : ""}{option.happinessImpact}</div>)}{option.healthImpact !== undefined && (<div className={`option-effect ${option.healthImpact >= 0 ? "positive" : "negative"}`}>Health: {option.healthImpact >= 0 ? "+" : ""}{option.healthImpact}</div>)}</div></div><div className="option-description">{option.description || 'No description.'}</div></div>); }); };
  const renderFoodOptions = () => { if (!baselineExpenses.food || !baselineExpenses.food.descriptions || !playerState.location?.costIndices) return <p>Food data unavailable.</p>; return Object.entries(baselineExpenses.food).filter(([key]) => key !== "descriptions").map(([key, cost]) => { if (typeof cost !== 'number') return null; const adjustedCost = cost * playerState.location.costIndices.foodIndex; const isSelected = playerState.chosenFoodOption === key; const description = baselineExpenses.food.descriptions[key] || 'No description.'; let healthEffect = 0, happinessEffect = 0; if (key === "budget") { healthEffect = -5; happinessEffect = -5; } else if (key === "basic") { healthEffect = -2; happinessEffect = -1; } else if (key === "medium") { healthEffect = 2; happinessEffect = 2; } else if (key === "premium") { healthEffect = 5; happinessEffect = 5; } return ( <div key={`food-${key}`} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "food")} role="button" tabIndex={0} aria-pressed={isSelected}> <div className="option-header"><h4>{formatChoice(key)}</h4>{isSelected && <span className="selected-badge">Current</span>}</div><div className="option-details"><div className="option-cost"><strong>{formatCurrency(adjustedCost)}</strong><span className="option-percent"> /week</span></div><div className="option-effects"><div className={`option-effect ${healthEffect >= 0 ? "positive" : "negative"}`}>Health: {healthEffect >= 0 ? "+" : ""}{healthEffect}</div><div className={`option-effect ${happinessEffect >= 0 ? "positive" : "negative"}`}>Happiness: {happinessEffect >= 0 ? "+" : ""}{happinessEffect}</div></div></div><div className="option-description">{description}</div></div>); }); };
  const renderHealthcareOptions = () => { if (!baselineExpenses.healthcare) return <p>Healthcare data unavailable.</p>; return Object.entries(baselineExpenses.healthcare).map(([key, option]) => { if (!option) return null; const isSelected = playerState.healthcareOption === key; return ( <div key={`healthcare-${key}`} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "healthcare")} role="button" tabIndex={0} aria-pressed={isSelected}> <div className="option-header"><h4>{formatChoice(key)}</h4>{isSelected && <span className="selected-badge">Current</span>}</div><div className="option-details"><div className="option-cost"><strong>{formatCurrency(option.cost || 0)}</strong><span className="option-percent"> /week</span></div><div className="option-effects">{option.healthImpact !== undefined && (<div className={`option-effect ${option.healthImpact >= 0 ? "positive" : "negative"}`}>Health: {option.healthImpact >= 0 ? "+" : ""}{option.healthImpact}</div>)}</div></div><div className="option-description">{option.description || 'No description.'}</div></div>); }); };
  const renderEntertainmentOptions = () => { if (!baselineExpenses.entertainment) return <p>Entertainment data unavailable.</p>; return Object.entries(baselineExpenses.entertainment).map(([key, option]) => { if (!option) return null; const isSelected = playerState.entertainmentOption === key; return ( <div key={`entertainment-${key}`} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "entertainment")} role="button" tabIndex={0} aria-pressed={isSelected}> <div className="option-header"><h4>{formatChoice(key)}</h4>{isSelected && <span className="selected-badge">Current</span>}</div><div className="option-details"><div className="option-cost"><strong>{formatCurrency(option.cost || 0)}</strong><span className="option-percent"> /week</span></div><div className="option-effects">{option.happinessImpact !== undefined && (<div className={`option-effect ${option.happinessImpact >= 0 ? "positive" : "negative"}`}>Happiness: {option.happinessImpact >= 0 ? "+" : ""}{option.happinessImpact}</div>)}</div></div><div className="option-description">{option.description || 'No description.'}</div></div>); }); };
  const renderEducationOptions = () => {
    if (!baselineExpenses.education || !playerState.location?.costIndices?.educationCostIndex) return <p>Education data unavailable.</p>;
    const costIndex = playerState.location.costIndices.educationCostIndex;
    return Object.entries(baselineExpenses.education).map(([key, option]) => {
      if (!option) return null;
      const adjustedCost = (option.baseCost || 0) * costIndex;
      const isSelected = playerState.educationOption === key;
      const affordable = playerState.balance >= adjustedCost;

      console.log(`Education Option: ${key}`);
      console.log(`  Option Data:`, option);
      console.log(`  Adjusted Cost: ${adjustedCost}`);
      console.log(`  Player Balance: ${playerState.balance}`);
      console.log(`  Affordable: ${affordable}`);

      return (
        <div
          key={`education-${key}`}
          className={`option-card ${isSelected ? "selected" : ""} ${!affordable ? "disabled" : ""}`}
          onClick={affordable ? () => handleOptionSelect(key, "education") : null}
          role="button"
          tabIndex={affordable ? 0 : -1}
          aria-disabled={!affordable}
          style={{ cursor: affordable ? 'pointer' : 'not-allowed', opacity: affordable ? 1 : 0.6 }}
        >
          <div className="option-header">
            <h4>{formatChoice(key)}</h4>
            {isSelected && <span className="selected-badge">Current</span>}
          </div>
          <div className="option-details">
            <div className="option-cost">
              <strong>{formatCurrency(adjustedCost)}</strong>
              <span className="option-percent"> /week</span>
            </div>
            <div className="option-effects">
              {option.skillImpact > 0 && (
                <div className="option-effect positive">Productivity Boost: +{option.skillImpact}</div>
              )}
            </div>
          </div>
          <div className="option-description">{option.description || 'No description.'}</div>
          {!affordable && <div className="option-warning">Cannot Afford</div>}
        </div>
      );
    });
  };
  const renderTransportationOptions = () => { if (!baselineExpenses.transportation) return <p>Transportation data unavailable.</p>; return Object.entries(baselineExpenses.transportation).map(([key, option]) => { if (!option) return null; const isSelected = playerState.transportationOption === key; return ( <div key={`transportation-${key}`} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "transportation")} role="button" tabIndex={0} aria-pressed={isSelected}> <div className="option-header"><h4>{formatChoice(key)}</h4>{isSelected && <span className="selected-badge">Current</span>}</div><div className="option-details"><div className="option-cost"><strong>{formatCurrency(option.weeklyCost || 0)}</strong><span className="option-percent"> /week</span></div><div className="option-effects">{option.happinessImpact !== undefined && (<div className={`option-effect ${option.happinessImpact >= 0 ? "positive" : "negative"}`}>Happiness: {option.happinessImpact >= 0 ? "+" : ""}{option.happinessImpact}</div>)}</div></div><div className="option-description">{option.description || 'No description.'}</div></div>); }); };
  const renderFamilyOptions = () => { if (!baselineExpenses.family) return <p>Family data unavailable.</p>; const dependents = playerState.dependents || 0; const costPer = baselineExpenses.family.costPerDependent || 0; const happinessPer = baselineExpenses.family.happinessBonusPerDependent || 0; const dependentCost = costPer * dependents; const dependentHappiness = happinessPer * dependents; return ( <div className="family-controls"> <div className="dependent-count">You have <span className="count">{dependents}</span> {dependents === 1 ? 'dependent' : 'dependents'}</div> {dependents > 0 && (<div className="dependent-details"><div className="detail-item"><span>Weekly cost:</span><span className="warning">{formatCurrency(dependentCost)}</span></div><div className="detail-item"><span>Happiness bonus:</span><span className="positive">+{dependentHappiness}</span></div></div>)} <div className="dependent-buttons"><button className="add-dependent action-button-inline" onClick={addDependent}><span className="action-icon-inline">👶</span>Add Dependent</button>{dependents > 0 && (<button className="remove-dependent action-button-inline" onClick={removeDependent} disabled={dependents <= 0}><span className="action-icon-inline">👋</span>Remove</button>)}</div><div className="family-description">{baselineExpenses.family.descriptions?.dependent || 'Manage your family size.'}</div></div>); };
  const renderLoanOptions = () => { const loans = playerState.loans || []; const monthlyIncome = playerState.monthlyIncome || 1; const totalDebt = loans.reduce((total, loan) => total + (loan?.principal || 0), 0); const monthlyPayments = loans.reduce((total, loan) => total + (loan?.monthlyPayment || 0), 0); const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyPayments / monthlyIncome) * 100 : Infinity; const isDangerousDebt = debtToIncomeRatio > 36; let estimatedMonths = Infinity, totalInterest = Infinity; const monthlyInterestPayment = (loanAmount * interestRate) / 12; const isPaymentTooLow = interestRate > 0 && monthlyPayment <= monthlyInterestPayment; if (!isPaymentTooLow && loanAmount > 0 && monthlyPayment > 0) { const monthlyRate = interestRate / 12; if (monthlyRate > 0) { if (monthlyPayment > loanAmount * monthlyRate) { estimatedMonths = Math.ceil(-Math.log(1 - (loanAmount * monthlyRate) / monthlyPayment) / Math.log(1 + monthlyRate)); if (estimatedMonths > 0 && isFinite(estimatedMonths)) { totalInterest = (monthlyPayment * estimatedMonths) - loanAmount; } else { estimatedMonths = Infinity; totalInterest = Infinity; } } else { estimatedMonths = Infinity; totalInterest = Infinity; } } else if (interestRate === 0) { estimatedMonths = Math.ceil(loanAmount / monthlyPayment); totalInterest = 0; } } return ( <div className="loan-form"><h4>Take out a new loan</h4><div className="loan-inputs"><div className="form-group"><label htmlFor="loanAmount">Loan Amount</label><input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))} min="0" step="100" className="form-input"/></div><div className="form-group"><label htmlFor="interestRate">Interest Rate (%)</label><input id="interestRate" type="number" value={(interestRate * 100).toFixed(1)} onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)) / 100)} min="0" step="0.1" className="form-input"/></div><div className="form-group"><label htmlFor="monthlyPayment">Monthly Payment</label><input id="monthlyPayment" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Math.max(0, Number(e.target.value)))} min="0" step="10" className="form-input"/></div></div><div className="loan-summary"><p>Est. Months to Repay: {isFinite(estimatedMonths) ? estimatedMonths : "N/A"}</p><p>Est. Total Interest: {isFinite(totalInterest) ? formatCurrency(totalInterest) : "N/A"}</p>{isPaymentTooLow && <p className="warning">Payment is too low to cover interest.</p>}</div><button className="take-loan-button action-button-inline" onClick={handleTakeLoan}>Take Loan</button><hr/><div className="current-loans"><h4>Your Current Loans</h4>{loans.length === 0 ? (<p>No active loans.</p>) : (<ul>{loans.map((loan, index) => (<li key={index}>Principal: {formatCurrency(loan.principal)} @ {(loan.interestRate * 100).toFixed(1)}% | Payment: {formatCurrency(loan.monthlyPayment)}/mo</li>))}</ul>)}<div className={`debt-ratio ${isDangerousDebt ? "warning" : ""}`}>Debt-to-Income Ratio: {isFinite(debtToIncomeRatio) ? debtToIncomeRatio.toFixed(1) : "N/A"}%</div></div></div>); };
  const renderSavingsOptions = () => { if (!baselineExpenses.savings) return <p>Savings data unavailable.</p>; const annualRatePercent = (playerState.savingsInterestRate * 100).toFixed(2); return ( <div className="savings-controls"><div className="savings-balance"><h4>Current Savings</h4><div className="balance-amount">{formatCurrency(playerState.savingsBalance || 0)}</div><div className="interest-rate">Annual Interest Rate: {annualRatePercent}%</div></div><div className="savings-transfer"><h4>Manual Transfer</h4><div className="form-group"><label htmlFor="savingsAmount">Amount</label><input id="savingsAmount" type="number" value={savingsInput} onChange={(e) => setSavingsInput(Math.max(0, Number(e.target.value)))} min="0" step="10" className="form-input" placeholder="e.g., 100"/></div><div className="action-buttons"><button className="action-button-inline positive" onClick={() => handleSavingsAction('deposit')} disabled={savingsInput <= 0 || playerState.balance < savingsInput}>Deposit</button><button className="action-button-inline warning" onClick={() => handleSavingsAction('withdraw')} disabled={savingsInput <= 0 || playerState.savingsBalance < savingsInput}>Withdraw</button></div></div><div className="savings-allocation"><h4>Monthly Allocation</h4><p>Set how much cash to automatically move to savings each month.</p><div className="form-group"><label htmlFor="savingsAllocation">Amount to Save Monthly</label><input id="savingsAllocation" type="number" value={allocationInput} onChange={(e) => setAllocationInput(Math.max(0, Number(e.target.value)))} min="0" step="10" className="form-input" placeholder="e.g., 100"/></div><button className="set-allocation-button action-button-inline" onClick={handleSetAllocation} disabled={Number(allocationInput) === playerState.monthlySavingsAllocation}><span className="action-icon-inline">💾</span>Set Allocation</button>{Number(allocationInput) > playerState.balance && ( <div className="savings-warning">Warning: Allocation exceeds current cash balance.</div>)}</div></div> ); };

  const renderInvestmentOptions = () => {
    if (!baselineExpenses.investments) return <p>Investment data unavailable.</p>;
    const handleMakeInvestment = () => {
      makeInvestment(investmentInput);
      setInvestmentInput(0);
    };
    return (
      <div className="investment-controls">
        <div className="current-investment">
          <h4>Current Investment</h4>
          <p>Type: {playerState.investmentType ? baselineExpenses.investments[playerState.investmentType].name : 'None'}</p>
          <p>Balance: {formatCurrency(playerState.investmentBalance || 0)}</p>
        </div>
        <div className="investment-options">
          {Object.entries(baselineExpenses.investments).map(([key, option]) => {
            const isSelected = playerState.investmentType === key;
            return (
              <div key={key} className={`option-card ${isSelected ? "selected" : ""}`} onClick={() => handleOptionSelect(key, "investments")} role="button" tabIndex={0} aria-pressed={isSelected}>
                <div className="option-header">
                  <h4>{option.name}</h4>
                  {isSelected && <span className="selected-badge">Selected</span>}
                </div>
                <div className="option-details">
                  <p>{option.description}</p>
                  <p>Return Rate: {(option.baseReturnRate * 100).toFixed(2)}%</p>
                  <p>Volatility: {(option.volatility * 100).toFixed(2)}%</p>
                </div>
              </div>
            );
          })}
          <div className="option-card" onClick={() => handleOptionSelect('none', "investments")}>
            <h4>None</h4>
            <p>Clear investment type.</p>
          </div>
        </div>
        <div className="investment-transfer">
          <h4>Invest Amount</h4>
          <div className="form-group">
            <label htmlFor="investmentAmount">Amount</label>
            <input id="investmentAmount" type="number" value={investmentInput} onChange={(e) => setInvestmentInput(Math.max(0, Number(e.target.value)))} min="0" step="100" className="form-input" placeholder="e.g., 500" />
          </div>
          <button className="action-button-inline positive" onClick={handleMakeInvestment} disabled={investmentInput <= 0 || playerState.balance < investmentInput}>Invest</button>
        </div>
        <div className="investment-transfer">
          <h4>Withdraw Amount</h4>
          <p className="investment-note">Enter the amount to withdraw from your investment balance and click Withdraw. Withdrawals are immediate.</p>
          <div className="form-group">
            <label htmlFor="withdrawAmount">Amount</label>
            <input id="withdrawAmount" type="number" value={withdrawInput} onChange={(e) => setWithdrawInput(Math.max(0, Number(e.target.value)))} min="0" step="100" className="form-input" placeholder="e.g., 500" />
          </div>
          <button className="action-button-inline warning" onClick={() => { withdrawFromInvestment(withdrawInput); setWithdrawInput(0); }} disabled={withdrawInput <= 0 || playerState.investmentBalance < withdrawInput}>Withdraw</button>
        </div>
      </div>
    );
  };

  

  const renderSideHustleOptions = () => { if (!baselineExpenses.sideHustle) return <p>Side Hustle data unavailable.</p>; const { sideHustleActive, sideHustleType, productivityLevel } = playerState; return ( <div className="side-hustle-controls"><div className="current-hustle-status"><h4>Status: {sideHustleActive ? (baselineExpenses.sideHustle[sideHustleType]?.name || 'Active') : 'Inactive'}</h4>{sideHustleActive && sideHustleType && (<p>Est. Income: +{formatCurrency((baselineExpenses.sideHustle[sideHustleType].baseWeeklyIncome || 0) * productivityLevel * 0.1)} / week.</p>)}</div><div className="hustle-options">{Object.entries(baselineExpenses.sideHustle).map(([key, hustle]) => { const isActive = sideHustleActive && sideHustleType === key; const buttonText = isActive ? `Stop ${hustle.name}` : `Start ${hustle.name}`; const buttonAction = isActive ? () => toggleSideHustle(null) : () => toggleSideHustle(key); const isDisabled = sideHustleActive && !isActive; return ( <div key={key} className={`hustle-option-card option-card ${isActive ? "selected" : ""}`}><div className="option-header"><h4>{formatChoice(hustle.name)}</h4></div><div className="option-details"><div className="option-cost"><strong>Est. Income: +{formatCurrency((hustle.baseWeeklyIncome || 0) * productivityLevel * 0.1)} / week</strong></div><div className="option-effect negative">Stress Impact: -{hustle.stressImpact || 0} Happiness / week</div></div><div className="option-description">{hustle.description || ''}</div><button className={`action-button-inline ${isActive ? 'warning' : isDisabled ? '' : 'positive'}`} onClick={buttonAction} disabled={isDisabled} style={{marginTop: '10px'}}>{buttonText}</button></div> ); })}</div></div> ); };
  const renderWellbeingOptions = () => { if (!baselineExpenses.wellbeing) return <p>Wellbeing data unavailable.</p>; return Object.entries(baselineExpenses.wellbeing).map(([key, activity]) => { const affordable = playerState.balance >= activity.cost; return ( <div key={key} className={`option-card wellbeing-option ${!affordable ? 'disabled' : ''}`} onClick={affordable ? () => applyWellbeing(key) : null} role="button" tabIndex={affordable ? 0 : -1} aria-disabled={!affordable} style={{ cursor: affordable ? 'pointer' : 'not-allowed', opacity: affordable ? 1 : 0.6 }}><div className="option-header"><h4>{formatChoice(activity.name)}</h4></div><div className="option-details"><div className="option-cost"><strong>Cost: {formatCurrency(activity.cost)}</strong></div><div className="option-effects">{activity.healthBoost > 0 && (<div className="option-effect positive">Health: +{activity.healthBoost}</div>)}{activity.happinessBoost > 0 && (<div className="option-effect positive">Happiness: +{activity.happinessBoost}</div>)}</div></div><div className="option-description">{activity.description || ''}</div>{!affordable && <div className="option-warning">Cannot Afford</div>}</div> ); }); };

  const renderActionPanel = () => {
    const panelMap = {
      housing: { title: "Housing Options", renderer: renderHousingOptions }, food: { title: "Food Options", renderer: renderFoodOptions }, healthcare: { title: "Healthcare Options", renderer: renderHealthcareOptions }, entertainment: { title: "Entertainment Options", renderer: renderEntertainmentOptions }, education: { title: "Education Options", renderer: renderEducationOptions }, transportation: { title: "Transportation Options", renderer: renderTransportationOptions }, sideHustle: { title: "Side Hustle", renderer: renderSideHustleOptions }, wellbeing: { title: "Wellbeing Activities", renderer: renderWellbeingOptions }, family: { title: "Family Management", renderer: renderFamilyOptions }, savings: { title: "Savings Management", renderer: renderSavingsOptions },  loans: { title: "Loan Management", renderer: renderLoanOptions }, investments: { title: "Investment Management", renderer: renderInvestmentOptions },
    };
    const selectedPanel = panelMap[selectedAction];
    if (!selectedPanel) { return <div className="action-options-placeholder">Select an action icon to see options.</div>; }
    const renderedContent = selectedPanel.renderer();
    if (!renderedContent || (Array.isArray(renderedContent) && renderedContent.length === 0)) {
      return (
        <>
          <h3>{selectedPanel.title}</h3>
          <div className="action-options-placeholder">No options available for this action.</div>
        </>
      );
    }
    return ( <><h3>{selectedPanel.title}</h3><div className="options-grid-container">{renderedContent}</div></> );
  };

  const renderBudgetTab = () => {
    const expenses = calculateMonthlyExpenses(); const monthlyIncome = playerState.monthlyIncome || 0; const monthlyNet = monthlyIncome - expenses.monthly - (playerState.monthlySavingsAllocation || 0); const housingCost = (playerState.housingChoice && baselineExpenses.housing[playerState.housingChoice]) ? (baselineExpenses.housing[playerState.housingChoice].rent || 0) * (playerState.location.costIndices.housingIndex || 1) : 0; const incomeToHousingRatio = monthlyIncome > 0 && housingCost > 0 ? (housingCost / monthlyIncome * 100) : 0; const savingsRate = monthlyIncome > 0 ? ((playerState.monthlySavingsAllocation || 0) / monthlyIncome * 100) : 0; const loans = playerState.loans || []; const monthlyLoanPayments = loans.reduce((total, loan) => total + (loan?.monthlyPayment || 0), 0); const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyLoanPayments / monthlyIncome * 100) : Infinity; const isHighDebt = debtToIncomeRatio > 36; const productivityLevel = playerState.productivityLevel || 1; const productivityMultiplier = 1 + (productivityLevel - 1) * 0.05;
    return ( <div className="budget-container"><div className="budget-column"><div className="budget-section"><h4>Monthly Income</h4><div className="budget-item income"><span>Total Monthly Income</span><span>{formatCurrency(monthlyIncome)}</span></div><div className="budget-item income-detail"><span>(Productivity Lvl {productivityLevel})</span><span>Multiplier: x{productivityMultiplier.toFixed(2)}</span></div>{playerState.laidOff && (<div className="budget-item warning"><span>NOTICE: Laid off</span><span>(Reduced income)</span></div>)}</div><div className="budget-section"><h4>Monthly Fixed Expenses</h4>{playerState.housingChoice && housingCost > 0 && (<div className="budget-item"><span>Housing ({playerState.housingChoice})</span><span>{formatCurrency(housingCost)}</span></div>)}{baselineExpenses?.amenities && (<><div className="budget-item"><span>Utilities</span><span>{formatCurrency((baselineExpenses.amenities.basicUtilitiesPerMonth || 0) * (playerState.location.costIndices.utilitiesIndex || 1))}</span></div><div className="budget-item"><span>Internet</span><span>{formatCurrency(baselineExpenses.amenities.internetPerMonth || 0)}</span></div><div className="budget-item"><span>Cell Phone</span><span>{formatCurrency(baselineExpenses.amenities.cellPhonePerMonth || 0)}</span></div></>)}{monthlyLoanPayments > 0 && (<div className="budget-item"><span>Loan Payments</span><span>{formatCurrency(monthlyLoanPayments)}</span></div>)}{playerState.monthlySavingsAllocation > 0 && (<div className="budget-item"><span>Savings Allocation</span><span>{formatCurrency(playerState.monthlySavingsAllocation)}</span></div>)}<div className="budget-item total-expenses"><span>Total Monthly Fixed + Savings</span><span>{formatCurrency(expenses.monthly + (playerState.monthlySavingsAllocation || 0))}</span></div></div><div className="budget-section"><h4>Weekly Variable Expenses</h4><div className="budget-item total-expenses"><span>Est. Total Weekly Variable</span><span>{formatCurrency(expenses.weekly)}</span></div></div><div className="budget-section"><h4>Financial Summary</h4><div className="budget-item balance-summary"><span className={monthlyNet >= 0 ? "positive" : "negative"}>Monthly Net</span><span className={monthlyNet >= 0 ? "positive" : "negative"}>{formatCurrency(monthlyNet)}</span></div><div className="budget-item"><span className={incomeToHousingRatio > 30 ? "warning" : ""}>Housing/Income Ratio</span><span>{incomeToHousingRatio.toFixed(1)}%</span></div><div className="budget-item"><span className={savingsRate < 10 ? "warning" : "positive"}>Savings Rate</span><span>{savingsRate.toFixed(1)}%</span></div><div className="budget-item"><span className={isHighDebt ? "warning" : ""}>Debt/Income Ratio</span><span>{isFinite(debtToIncomeRatio) ? `${debtToIncomeRatio.toFixed(1)}%` : "N/A"}</span></div></div></div></div> );
  };

  const renderTutorial = () => { if (!showTutorial) return null; return ( <div className="tutorial-overlay"><div className="tutorial-content"><h3>Welcome!</h3><p>Survive for 1 year (52 weeks) in {playerState.location?.name || 'this city'} on a {playerState.wageType || 'given'} wage.</p><h4>How to Play:</h4><ul><li>Use <strong>Action Buttons</strong> (left) to manage choices.</li><li>Check <strong>Budget</strong> (right) for financial stats.</li><li>Monitor the <strong>Event Message</strong> (top) for updates.</li><li>Keep <strong>Balance, Health, Happiness</strong> above zero!</li><li>Click <strong>Next Week</strong> to advance time. Paid monthly.</li></ul><p>Good luck!</p><button className="close-tutorial action-button-inline" onClick={() => setShowTutorial(false)}>Start Simulation</button></div></div> ); };

  if (!playerState || !playerState.location) { return <div className="loading">Loading game data...</div>; }

  return (
    <div className="game-screen-container compact-layout">
    {renderTutorial()}
    <div className="game-main">
    <div className="game-header">
    <div className="header-top-row"><div className="location-info"><h2>{playerState.location.name}</h2><div className="game-progress"><span>Week {playerState.currentWeek} / 52</span><div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${Math.min(100, (playerState.currentWeek / 52) * 100)}%` }} role="progressbar" aria-valuenow={playerState.currentWeek} aria-valuemin="0" aria-valuemax="52" aria-label="Game Progress"></div></div></div></div><div className="header-event-log"><span>{playerState.latestEventMessage || " "}</span></div></div>
    <div className="header-bottom-row"><div className="game-stats"><div className="stat-group"><div className="stat-item"><div className="stat-label">Balance</div><div className={`stat-value ${playerState.balance < 0 ? "negative" : "positive"}`}>{formatCurrency(playerState.balance)}</div></div><div className="stat-item"><div className="stat-label">Savings</div><div className="stat-value positive">{formatCurrency(playerState.savingsBalance || 0)}</div></div><div className="stat-item"><div className="stat-label">Investments</div><div className="stat-value positive">{formatCurrency(playerState.investmentBalance || 0)}</div></div><div className="stat-item"><div className="stat-label">Monthly Income</div><div className="stat-value positive">{formatCurrency(playerState.monthlyIncome)}</div></div><div className="stat-item"><div className="stat-label">Productivity</div><div className="stat-bar-combo"><div className="stat-bar"><div className={`stat-fill ${getBarColor(playerState.productivityProgress / playerState.productivityThreshold * 100)}`} style={{ width: `${playerState.productivityProgress / playerState.productivityThreshold * 100}%` }}></div></div><div className={`stat-number ${getBarColor(playerState.productivityProgress / playerState.productivityThreshold * 100)}`}>{playerState.productivityLevel}</div></div></div><div className="stat-group"><div className="stat-item"><div className="stat-label">Health</div><div className="stat-bar-combo"><div className="stat-bar"><div className={`stat-fill ${getBarColor(playerState.health)}`} style={{ width: `${playerState.health}%` }}></div></div><div className={`stat-number ${getBarColor(playerState.health)}`}>{playerState.health}%</div></div></div><div className="stat-item"><div className="stat-label">Happiness</div><div className="stat-bar-combo"><div className="stat-bar"><div className={`stat-fill ${getBarColor(playerState.happiness)}`} style={{ width: `${playerState.happiness}%` }}></div></div><div className={`stat-number ${getBarColor(playerState.happiness)}`}>{playerState.happiness}%</div></div></div></div></div></div>
    </div>
    <div className="game-content-wrapper">
    <div className="game-actions">
    <div className="action-buttons-column">
    {actions.map((action) => ( <button key={action.id} className={`action-button-vertical ${selectedAction === action.id ? "active" : ""}`} onClick={() => handleActionSelect(action.id)} aria-pressed={selectedAction === action.id} aria-label={`Select ${action.label} options`}><span className="action-icon" role="img" aria-label={action.label}>{action.icon}</span><span className="action-label">{action.label}</span></button>))}

    </div>
    <div className="action-options-display">{renderActionPanel()}</div>
    </div>
    <div className="game-content"><h3>Budget Overview</h3>{renderBudgetTab()}</div>
    <div className="next-week-container-footer">
    {playerState.health <= 0 || playerState.happiness <= 0 || playerState.balance < 0 ? (
      <Link to="/simulation" className="next-week-button action-button-inline large">
      Start Over?
      </Link>
    ) : (
      <button className="next-week-button action-button-inline large" onClick={handleNextWeek}>
      Next Week →
      </button>
    )}
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
export default GameScreen;
