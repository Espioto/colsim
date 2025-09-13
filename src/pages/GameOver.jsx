import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useNotification } from '../context/NotificationContext';
import './GameOver.css'; // Make sure this CSS file exists

const GameOver = () => {
  const { playerState } = useGame();
  const { showSuccess } = useNotification();

  const handleShare = () => {
    const summary = `
Cost of Living Simulator Results
Location: ${finalState.location.name}
Wage Type: ${finalState.wageType}
Weeks Survived: ${finalState.weeksSurvived}/52
Final Balance: ${formatCurrency(finalState.balance)}
Final Savings: ${formatCurrency(finalState.savingsBalance)}
Final Debt: ${formatCurrency(finalDebt)}
Final Health: ${finalState.health}%
Final Happiness: ${finalState.happiness}%
Productivity Level: ${finalState.productivityLevel}
    `.trim();
    navigator.clipboard.writeText(summary).then(() => showSuccess('Results copied to clipboard!'));
  };

  const finalState = playerState || {
    balance: 0, health: 0, happiness: 0, weeksSurvived: 0,
    location: { name: 'Unknown', minWage: 0, medianBottom50Annual: 0, costIndices: {} },
    wageType: 'unknown', monthlyIncome: 0, housingChoice: 'None',
    dependents: 0, productivityLevel: 1, educationOption: 'none',
    savingsBalance: 0, loans: []
  };

  const getGameOverReason = () => {
    if (finalState.balance < 0 && (finalState.health <=0 || finalState.happiness <=0) ) { // Check if multiple conditions met
        return { title: "Financial & Wellbeing Crisis", message: "Your finances depleted and your wellbeing reached critical levels.", icon: "💔"};
    }
    if (finalState.balance < -(finalState.monthlyIncome * 0.5 || 500) ) { // More specific financial trigger
      return { title: "Financial Ruin", message: "You ran out of funds and couldn't cover essential expenses.", icon: "💸" };
    } else if (finalState.health <= 0) {
      return { title: "Health Crisis", message: "Your health deteriorated to a critical level.", icon: "🏥" };
    } else if (finalState.happiness <= 0) {
      return { title: "Severe Burnout", message: "Your happiness reached zero, leading to severe burnout.", icon: "😔" };
    } else {
      return { title: "Simulation Ended Unexpectedly", message: "Your simulation journey has concluded.", icon: "⚠️" };
    }
  };

  const reason = getGameOverReason();

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) amount = 0;
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const finalDebt = (finalState.loans || []).reduce((sum, loan) => sum + (loan.principal || 0), 0);

  return (
    <div className="game-over-container fade-in">
      <div className="game-over-header">
        <div className="game-over-icon">{reason.icon}</div>
        <h1>Game Over: {reason.title}</h1>
        <p className="game-over-message">{reason.message}</p>
      </div>

      <div className="results-grid">
        <div className="results-card">
          <h3>Survival Summary</h3>
          <p><strong>Weeks Survived:</strong> <span className="highlight">{finalState.weeksSurvived} / 52</span></p>
          <p><strong>Final Health:</strong> <span className={finalState.health <= 20 ? 'negative' : ''}>{finalState.health}%</span></p>
          <p><strong>Final Happiness:</strong> <span className={finalState.happiness <= 20 ? 'negative' : ''}>{finalState.happiness}%</span></p>
          <p><strong>Dependents:</strong> {finalState.dependents}</p>
        </div>

        <div className="results-card">
          <h3>Financial Snapshot</h3>
          <p><strong>Final Cash:</strong> <span className={finalState.balance < 0 ? 'negative' : 'positive'}>{formatCurrency(finalState.balance)}</span></p>
          <p><strong>Final Savings:</strong> <span className="positive">{formatCurrency(finalState.savingsBalance)}</span></p>
          <p><strong>Final Investments:</strong> <span className="positive">{formatCurrency(finalState.investmentBalance)}</span></p>
          <p><strong>Total Debt:</strong> <span className={finalDebt > 0 ? 'negative' : ''}>{formatCurrency(finalDebt)}</span></p>
          <p><strong>Final Monthly Income:</strong> {formatCurrency(finalState.monthlyIncome)} ({finalState.wageType})</p>
          <p><strong>Total Income Earned:</strong> {formatCurrency(finalState.monthlyIncome * (finalState.weeksSurvived / 4))}</p>
        </div>

        <div className="results-card">
          <h3>Achievements & Choices</h3>
          <p><strong>Productivity Level:</strong> <span className="highlight">{finalState.productivityLevel}</span></p>
          <p><strong>Education Choice:</strong> {finalState.educationOption === 'none' || !finalState.educationOption ? "None" : finalState.educationOption.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
          <p><strong>Housing:</strong> {finalState.housingChoice ? finalState.housingChoice.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Not Set'}</p>
        </div>
      </div>

      <div className="game-over-reflection">
        <h3>Reflection</h3>
        <p>
          This simulation highlights the financial pressures many face. Factors like your starting location
          ({finalState.location.name}), income level ({finalState.wageType}), unexpected life events,
          and your spending choices all significantly impact financial stability and overall well-being.
          Consider what choices could have led to a different outcome.
        </p>
      </div>

      <div className="game-over-actions">
        <Link to="/simulation" className="button primary">Start Over?</Link>
        <button className="button secondary" onClick={handleShare}>Share Results</button>
      </div>
    </div>
  );
};

export default GameOver;
