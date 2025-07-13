import React, { createContext, useContext, useState } from "react";
import statesData from "../data/statesData"; // YOU MUST POPULATE THIS FILE
import baselineExpenses from "../data/baselineExpenses";
import randomEvents from "../data/randomEvents";
import { formatChoice } from "../utils/utils";

const GameContext = createContext(null);

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const initialPlayerState = {
    location: null, wageType: null, monthlyIncome: 0, currentWeek: 1, balance: 0,
    health: 100, happiness: 100, productivityLevel: 1, productivityProgress: 0,
    productivityThreshold: 52, savingsBalance: 0, savingsInterestRate: 0.005,
    monthlySavingsAllocation: 0, dependents: 0, housingChoice: null,
    chosenFoodOption: "basic", entertainmentOption: "none", healthcareOption: "none",
    educationOption: "none", transportationOption: "publicTransit", loans: [],
    laidOff: false, weeksSurvived: 0, latestEventMessage: '',
    sideHustleActive: false, sideHustleType: null,
    investmentBalance: 0, investmentReturnRate: 0.08, // Annual return rate (e.g., 8%)
    inflationRate: 0.03, // Annual inflation rate (e.g., 3%)
    investmentType: null,
    careerLevel: 'entry',
  };

  const [playerState, setPlayerState] = useState(initialPlayerState);
  const [selectedMapState, setSelectedMapState] = useState(null);

  const randomBetween = (min, max) => {
    const validMin = typeof min === 'number' ? min : 0;
    const validMax = typeof max === 'number' ? max : validMin;
    return Math.floor(Math.random() * (validMax - validMin + 1)) + validMin;
  };

  const initializeGame = (selectedStateName, wageType, navigate) => {
    const stateObj = statesData.find((s) => s.name === selectedStateName);
    if (!stateObj) {
      console.error("State data not found for:", selectedStateName, ". Ensure statesData.js is populated.");
      if (navigate) navigate('/simulation');
      return;
    }
    let baseMonthlyIncome;
    if (wageType === "minimum") { baseMonthlyIncome = (stateObj.minWage || 0) * 160; }
    else { baseMonthlyIncome = (stateObj.medianBottom50Annual || 0) / 12; }
    setPlayerState({
      ...initialPlayerState, location: stateObj, wageType,
      monthlyIncome: baseMonthlyIncome, balance: baseMonthlyIncome,
      latestEventMessage: `Simulation started in ${stateObj.name}.`,
    });
    setGameOver(false); setWin(false);
    if (navigate) { navigate('/game'); }
    else { console.error("Navigate function missing in initializeGame."); }
  };

  const addDependent = () => { setPlayerState((prev) => ({ ...prev, dependents: prev.dependents + 1, latestEventMessage: "Added a dependent." })); };
  const removeDependent = () => { setPlayerState((prev) => ({ ...prev, dependents: Math.max(0, prev.dependents - 1), latestEventMessage: "Removed a dependent." })); };
  const takeLoan = (amount, interestRate, monthlyPayment) => { if (amount <= 0 || interestRate < 0 || monthlyPayment <= 0) return; setPlayerState((prev) => ({ ...prev, balance: prev.balance + amount, loans: [...prev.loans, { principal: amount, interestRate, monthlyPayment }], latestEventMessage: `Took out loan: ${formatCurrency(amount)}.` })); };
  const setSavingsAllocation = (amount) => { const allocationAmount = Math.max(0, Number(amount) || 0); setPlayerState(prev => ({ ...prev, monthlySavingsAllocation: allocationAmount, latestEventMessage: `Monthly savings set to ${formatCurrency(allocationAmount)}.` })); };

  const depositToSavings = (amount) => {
    const depositAmount = Math.max(0, Number(amount) || 0);
    setPlayerState(prev => {
      if (prev.balance < depositAmount) {
        return { ...prev, latestEventMessage: `Cannot deposit ${formatCurrency(depositAmount)}. Insufficient balance.` };
      }
      return {
        ...prev,
        balance: prev.balance - depositAmount,
        savingsBalance: prev.savingsBalance + depositAmount,
        latestEventMessage: `Deposited ${formatCurrency(depositAmount)} to savings.`
      };
    });
  };

  const withdrawFromSavings = (amount) => {
    const withdrawAmount = Math.max(0, Number(amount) || 0);
    setPlayerState(prev => {
      if (prev.savingsBalance < withdrawAmount) {
        return { ...prev, latestEventMessage: `Cannot withdraw ${formatCurrency(withdrawAmount)}. Insufficient savings.` };
      }
      return {
        ...prev,
        balance: prev.balance + withdrawAmount,
        savingsBalance: prev.savingsBalance - withdrawAmount,
        latestEventMessage: `Withdrew ${formatCurrency(withdrawAmount)} from savings.`
      };
    });
  };

  const makeInvestment = (amount) => {
    setPlayerState(prev => {
      const investmentAmount = Math.max(0, Number(amount) || 0);
      if (prev.balance < investmentAmount) {
        return { ...prev, latestEventMessage: `Cannot invest ${formatCurrency(investmentAmount)}. Insufficient balance.` };
      }
      if (!prev.investmentType) {
        return { ...prev, latestEventMessage: `Please choose an investment type before investing.` };
      }
      return {
        ...prev,
        balance: prev.balance - investmentAmount,
        investmentBalance: prev.investmentBalance + investmentAmount,
        latestEventMessage: `Invested ${formatCurrency(investmentAmount)} in ${prev.investmentType}.`, 
      };
    });
  };

  const withdrawFromInvestment = (amount) => {
    setPlayerState(prev => {
      const withdrawAmount = Math.max(0, Number(amount) || 0);
      if (prev.investmentBalance < withdrawAmount) {
        return { ...prev, latestEventMessage: `Cannot withdraw ${formatCurrency(withdrawAmount)}. Insufficient investment balance.` };
      }
      return {
        ...prev,
        balance: prev.balance + withdrawAmount,
        investmentBalance: prev.investmentBalance - withdrawAmount,
        latestEventMessage: `Withdrew ${formatCurrency(withdrawAmount)} from investments.`
      };
    });
  };

  const chooseInvestment = (type) => {
    if (baselineExpenses.investments?.[type]) {
      setPlayerState((prev) => ({ ...prev, investmentType: type, latestEventMessage: `Selected ${baselineExpenses.investments[type].name} investment.` }));
    } else if (type === 'none') {
      setPlayerState((prev) => ({ ...prev, investmentType: null, latestEventMessage: `Cleared investment type.` }));
    }
  };

  const toggleSideHustle = (type) => {
    setPlayerState(prev => {
      const currentlyActive = prev.sideHustleActive && prev.sideHustleType === type;
      const newActiveState = !currentlyActive;
      const newType = newActiveState ? type : null;
      let message = '';
      if (newActiveState) {
        const hustleName = baselineExpenses.sideHustle[type]?.name || 'Side Hustle';
        message = `Started ${hustleName}.`;
      } else if (prev.sideHustleActive) {
        const hustleName = baselineExpenses.sideHustle[prev.sideHustleType]?.name || 'Side Hustle';
        message = `Stopped ${hustleName}.`;
      }
      return { ...prev, sideHustleActive: newActiveState, sideHustleType: newType, latestEventMessage: message || prev.latestEventMessage };
    });
  };

  const applyWellbeing = (type) => {
     const activity = baselineExpenses.wellbeing[type];
     if (!activity) return;
     setPlayerState(prev => {
        if (prev.balance < activity.cost) { return { ...prev, latestEventMessage: `Cannot afford ${activity.name} (${formatCurrency(activity.cost)} needed).` }; }
        const newHealth = Math.min(100, prev.health + (activity.healthBoost || 0));
        const newHappiness = Math.min(100, prev.happiness + (activity.happinessBoost || 0));
        return { ...prev, balance: prev.balance - activity.cost, health: newHealth, happiness: newHappiness, latestEventMessage: `${activity.name}: Cost ${formatCurrency(activity.cost)}. Health +${activity.healthBoost || 0}, Happiness +${activity.happinessBoost || 0}.` };
     });
  };

  const nextWeek = () => {
    if (gameOver || win) return;
    setPlayerState((prevState) => {
        let { balance, health, happiness, productivityLevel, productivityProgress, productivityThreshold, savingsBalance, savingsInterestRate, monthlySavingsAllocation, location, wageType, chosenFoodOption, housingChoice, entertainmentOption, healthcareOption, educationOption, transportationOption, dependents, loans, laidOff, currentWeek, weeksSurvived, sideHustleActive, sideHustleType, investmentBalance, investmentReturnRate, inflationRate, investmentType, careerLevel } = prevState;
        let latestEvent = '';
        if (!location?.costIndices || !location.name) { setGameOver(true); return {...prevState, latestEventMessage: "Critical Error: Location Data Missing!"}; }
        const { costIndices } = location;

        (randomEvents || []).forEach((evt) => {
            if (!evt || typeof evt.chance !== 'number') return; let shouldApply = Math.random() < evt.chance; if (evt.requiresChildren && dependents === 0) shouldApply = false; if (evt.seasonal) { const weekOfYear = currentWeek % 52; const currentSeason = (weekOfYear < 10 || weekOfYear > 42) ? 'winter' : (weekOfYear < 20) ? 'spring' : (weekOfYear < 36) ? 'summer' : 'autumn'; shouldApply = shouldApply && evt.seasonal === currentSeason && (Math.random() < 0.5); } if (shouldApply) { const cost = randomBetween(evt.costRange?.[0], evt.costRange?.[1]); balance -= cost; health += evt.healthChange || 0; happiness += evt.happinessChange || 0; if (evt.effect === "layoff") laidOff = true; 
            if (evt.productivityChange) {
              productivityProgress += evt.productivityChange * productivityThreshold; // Adjust progress based on percentage change
              if (productivityProgress < 0) productivityProgress = 0; // Ensure it doesn't go below zero
              latestEvent = latestEvent || `${evt.name}: Productivity ${evt.productivityChange > 0 ? 'boost' : 'slump'}.`;
            }
            latestEvent = `${evt.name}: ${cost >= 0 ? `Cost ${formatCurrency(cost)}` : `Gain ${formatCurrency(Math.abs(cost))}`}${evt.healthChange ? `, Health ${evt.healthChange > 0 ? '+' : ''}${evt.healthChange}` : ''}${evt.happinessChange ? `, Happiness ${evt.happinessChange > 0 ? '+' : ''}${evt.happinessChange}` : ''}${evt.effect === 'layoff' ? ' (Laid Off!)' : ''}`; }
        });

        if (chosenFoodOption && baselineExpenses.food?.[chosenFoodOption]) { balance -= baselineExpenses.food[chosenFoodOption] * (costIndices.foodIndex || 1); if (chosenFoodOption === "budget") { health -= 5; happiness -= 5; } else if (chosenFoodOption === "basic") { health -= 2; happiness -= 1; } else if (chosenFoodOption === "medium") { health += 2; happiness += 2; } else if (chosenFoodOption === "premium") { health += 5; happiness += 5; } }
        if (entertainmentOption && baselineExpenses.entertainment?.[entertainmentOption]) { balance -= baselineExpenses.entertainment[entertainmentOption].cost || 0; happiness += baselineExpenses.entertainment[entertainmentOption].happinessImpact || 0; }
        if (healthcareOption && baselineExpenses.healthcare?.[healthcareOption]) { balance -= baselineExpenses.healthcare[healthcareOption].cost || 0; health += baselineExpenses.healthcare[healthcareOption].healthImpact || 0; }
        if (educationOption && educationOption !== "none" && baselineExpenses.education?.[educationOption]) { balance -= (baselineExpenses.education[educationOption].baseCost || 0) * (costIndices.educationCostIndex || 1); }
        if (transportationOption && baselineExpenses.transportation?.[transportationOption]) { balance -= baselineExpenses.transportation[transportationOption].weeklyCost || 0; happiness += baselineExpenses.transportation[transportationOption].happinessImpact || 0; }
        if (dependents > 0 && baselineExpenses.family?.costPerDependent) { balance -= baselineExpenses.family.costPerDependent * dependents; happiness += (baselineExpenses.family.happinessBonusPerDependent || 0) * dependents; }

        if (sideHustleActive && sideHustleType) { const hustleData = baselineExpenses.sideHustle[sideHustleType]; if (hustleData) { const weeklyHustleIncome = (hustleData.baseWeeklyIncome || 0) * productivityLevel * 0.1; balance += weeklyHustleIncome; happiness -= hustleData.stressImpact || 0; latestEvent = latestEvent || `Earned ${formatCurrency(weeklyHustleIncome)} from ${hustleData.name}.`; } }

        // Check for career promotion
        const currentCareer = baselineExpenses.careers[careerLevel];
        const careerLevels = Object.keys(baselineExpenses.careers);
        const currentIndex = careerLevels.indexOf(careerLevel);
        if (currentIndex < careerLevels.length - 1) {
          const nextCareer = baselineExpenses.careers[careerLevels[currentIndex + 1]];
          if (productivityLevel >= nextCareer.requiredProductivity) {
            careerLevel = careerLevels[currentIndex + 1];
            latestEvent = latestEvent || `Promoted to ${nextCareer.name}! Income increased.`;
          }
        }

        let baseMonthly = 0; if (wageType === "minimum") { baseMonthly = (location.minWage || 0) * 160; } else { baseMonthly = (location.medianBottom50Annual || 0) / 12; } 
        const productivityMultiplier = 1 + (productivityLevel - 1) * 0.05; 
        const careerMultiplier = baselineExpenses.careers[careerLevel]?.incomeMultiplier || 1.0;
        let currentMonthlyIncome = baseMonthly * productivityMultiplier * careerMultiplier;

        const nextWeekNumber = currentWeek + 1;
        if (nextWeekNumber % 4 === 1) {
            let actualPay = currentMonthlyIncome; if (laidOff) { actualPay /= 2; laidOff = false; latestEvent = latestEvent || `Paycheck reduced: ${formatCurrency(actualPay)}`; } else { latestEvent = latestEvent || `Paycheck: ${formatCurrency(actualPay)}`; } balance += actualPay;
            if (housingChoice && baselineExpenses.housing?.[housingChoice]) { const rentCost = (baselineExpenses.housing[housingChoice].rent || 0) * (costIndices.housingIndex || 1); balance -= rentCost; happiness += baselineExpenses.housing[housingChoice].happinessImpact || 0; health += baselineExpenses.housing[housingChoice].healthImpact || 0; }
            if (baselineExpenses.amenities) { balance -= (baselineExpenses.amenities.basicUtilitiesPerMonth || 0) * (costIndices.utilitiesIndex || 1); balance -= baselineExpenses.amenities.internetPerMonth || 0; balance -= baselineExpenses.amenities.cellPhonePerMonth || 0; }
            if (savingsBalance > 0) { const monthlyInterestEarned = savingsBalance * (savingsInterestRate / 12); savingsBalance += monthlyInterestEarned; if (monthlyInterestEarned > 0.01) { latestEvent = latestEvent || `Savings interest: +${formatCurrency(monthlyInterestEarned)}`; } }
            if (monthlySavingsAllocation > 0) { if (balance >= monthlySavingsAllocation) { balance -= monthlySavingsAllocation; savingsBalance += monthlySavingsAllocation; latestEvent = latestEvent || `${formatCurrency(monthlySavingsAllocation)} moved to savings.`; } else { latestEvent = latestEvent || `Could not save ${formatCurrency(monthlySavingsAllocation)}.`; } }
            // Apply investment returns monthly with volatility
            if (investmentBalance > 0 && investmentType) {
              const investData = baselineExpenses.investments[investmentType];
              if (investData) {
                const monthlyBaseRate = investData.baseReturnRate / 12;
                const monthlyVolatility = investData.volatility / 12;
                const fluctuation = randomBetween(-monthlyVolatility * 100, monthlyVolatility * 100) / 100;
                const effectiveMonthlyRate = monthlyBaseRate + fluctuation;
                const monthlyInvestmentReturn = investmentBalance * effectiveMonthlyRate;
                investmentBalance += monthlyInvestmentReturn;
                if (Math.abs(monthlyInvestmentReturn) > 0.01) {
                  latestEvent = latestEvent || `Investment ${monthlyInvestmentReturn >= 0 ? 'gain' : 'loss'}: ${formatCurrency(monthlyInvestmentReturn)}.`;
                }
              }
            }

            // Apply inflation to expenses monthly (simplified: affects baseline costs)
            if (inflationRate > 0) {
              const monthlyInflationFactor = 1 + (inflationRate / 12);
              // This is a simplified approach. In a real app, you'd update specific expense values.
              // For now, we'll just note the impact.
              latestEvent = latestEvent || `Inflation: Expenses increased by ${(inflationRate * 100 / 12).toFixed(2)}%.`;
            }
            let paidThisMonth = 0; let updatedLoans = (loans || []).map((loan) => { if (!loan || typeof loan.principal !== 'number' || typeof loan.monthlyPayment !== 'number' || typeof loan.interestRate !== 'number') return null; let p = loan.principal; const monthlyInterest = p * (loan.interestRate / 12); const principalPayment = Math.max(0, loan.monthlyPayment - monthlyInterest); const actualPayment = Math.min(loan.monthlyPayment, p + monthlyInterest); const paymentToMake = Math.min(actualPayment, balance); balance -= paymentToMake; paidThisMonth += paymentToMake; p -= Math.max(0, paymentToMake - monthlyInterest); p = Math.max(0, p); return { ...loan, principal: p }; }).filter(loan => loan && loan.principal > 0.01); loans = updatedLoans; if (paidThisMonth > 0) { latestEvent = latestEvent || `Paid ${formatCurrency(paidThisMonth)} towards loans.`; }
        }

        if (health > 50 && health < 100) health += 1; else if (health < 50 && health > 0) health -= 1; const happinessBaseline = 50 + (housingChoice ? (baselineExpenses.housing?.[housingChoice]?.happinessImpact || 0) : -10) + (entertainmentOption !== 'none' ? 5 : -5) + (healthcareOption !== 'none' ? 5 : -5) + (dependents * 2); if (happiness < happinessBaseline && happiness < 100) happiness += 2; else if (happiness > happinessBaseline && happiness > 0) happiness -= 1; health = Math.max(0, Math.min(100, health)); happiness = Math.max(0, Math.min(100, happiness));

        productivityProgress += 1; if (productivityProgress >= productivityThreshold) { productivityLevel += 1; productivityProgress = 0; productivityThreshold = Math.ceil(productivityThreshold * 1.2); latestEvent = latestEvent || `Productivity Level ${productivityLevel}!`; }
        const finalEventMessage = latestEvent || `Week ${currentWeek} ended.`;

        const loseCondition = balance < - (currentMonthlyIncome * 0.5 || 500) || health <= 0 || happiness <= 0; if (loseCondition) { setGameOver(true); return { ...prevState, balance, health, happiness, productivityLevel, monthlyIncome: currentMonthlyIncome, currentWeek: nextWeekNumber, weeksSurvived, loans, laidOff, latestEventMessage: "Game Over!" }; }
        const winCondition = weeksSurvived + 1 >= 52; if (winCondition) { setWin(true); return { ...prevState, balance, health, happiness, productivityLevel, monthlyIncome: currentMonthlyIncome, currentWeek: nextWeekNumber, weeksSurvived: weeksSurvived + 1, loans, laidOff, latestEventMessage: "You survived the year!" }; }
        return { ...prevState, balance, health, happiness, productivityLevel, productivityProgress, productivityThreshold, savingsBalance, monthlySavingsAllocation, monthlyIncome: currentMonthlyIncome, currentWeek: nextWeekNumber, weeksSurvived: weeksSurvived + 1, loans, laidOff, latestEventMessage: finalEventMessage, sideHustleActive, sideHustleType, careerLevel };
    });
  };

  const chooseHousing = (key) => { if (baselineExpenses.housing?.[key]) { setPlayerState((prev) => ({ ...prev, housingChoice: key })); } };
  const chooseFoodOption = (key) => { if (baselineExpenses.food?.[key]) { setPlayerState((prev) => ({ ...prev, chosenFoodOption: key })); } };
  const chooseEntertainment = (key) => { if (baselineExpenses.entertainment?.[key]) { setPlayerState((prev) => ({ ...prev, entertainmentOption: key })); } };
  const chooseHealthcare = (key) => { if (baselineExpenses.healthcare?.[key]) { setPlayerState((prev) => ({ ...prev, healthcareOption: key })); } };
  const chooseEducation = (key) => {
    setPlayerState((prev) => {
      if (key === "none") {
        return { ...prev, educationOption: key, latestEventMessage: "Education choice reset." };
      }
      const education = baselineExpenses.education?.[key];
      if (education) {
        let newProductivityProgress = prev.productivityProgress + (education.skillImpact || 0);
        let newProductivityLevel = prev.productivityLevel;
        let newProductivityThreshold = prev.productivityThreshold;
        let message = `Chose ${formatChoice(key)} education.`;

        // Check if productivity level increases due to education
        if (newProductivityProgress >= newProductivityThreshold) {
          newProductivityLevel += 1;
          newProductivityProgress = newProductivityProgress - newProductivityThreshold; // Carry over excess progress
          newProductivityThreshold = Math.ceil(newProductivityThreshold * 1.2); // Increase threshold for next level
          message += ` Productivity Level increased to ${newProductivityLevel}!`;
        }

        return {
          ...prev,
          educationOption: key,
          productivityProgress: newProductivityProgress,
          productivityLevel: newProductivityLevel,
          productivityThreshold: newProductivityThreshold,
          latestEventMessage: message,
        };
      }
      return prev; // No change if education option is invalid
    });
  };
  const chooseTransportation = (key) => { if (baselineExpenses.transportation?.[key]) { setPlayerState((prev) => ({ ...prev, transportationOption: key })); } };

  const formatCurrency = (amount) => { if (typeof amount !== 'number' || isNaN(amount)) amount = 0; return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); };

  return (
    <GameContext.Provider value={{ playerState, gameOver, win, selectedMapState, setSelectedMapState, initializeGame, nextWeek, chooseHousing, chooseFoodOption, chooseEntertainment, chooseHealthcare, chooseEducation, chooseTransportation, addDependent, removeDependent, takeLoan, setSavingsAllocation, depositToSavings, withdrawFromSavings, makeInvestment, withdrawFromInvestment, chooseInvestment, toggleSideHustle, applyWellbeing, inflationRate: playerState.inflationRate }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
