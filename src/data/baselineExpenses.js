const baselineExpenses = {
  housing: {
    roommate: { rent: 750, happinessImpact: -10, healthImpact: -5, description: "Share a space with roommates to save on costs. Less privacy and potential conflicts." },
    cheapApartment: { rent: 1100, happinessImpact: -5, healthImpact: 0, description: "A basic apartment in a less desirable area. Functional but not fancy." },
    averageApartment: { rent: 1600, happinessImpact: 0, healthImpact: 0, description: "A decent apartment in an average neighborhood with standard amenities." },
    niceApartment: { rent: 2000, happinessImpact: 5, healthImpact: 0, description: "A quality apartment with good amenities in a nice area." },
    houseRental: { rent: 2500, happinessImpact: 10, healthImpact: 5, description: "A whole house with more space and privacy." }
  },
  food: { // Weekly costs
    budget: 65, basic: 85, medium: 140, premium: 220,
    descriptions: { budget: "Bare minimum, lots of ramen. Limited fresh produce.", basic: "Simple home cooking, some fresh ingredients.", medium: "Balanced diet, regular fresh produce, occasional eating out.", premium: "High-quality groceries, regular restaurant meals." }
  },
  entertainment: { // Weekly costs
    none: { cost: 0, happinessImpact: -5, description: "No entertainment budget." },
    minimal: { cost: 20, happinessImpact: 0, description: "Occasional streaming service." },
    budget: { cost: 40, happinessImpact: 5, description: "Basic streaming and occasional outings." },
    moderate: { cost: 80, happinessImpact: 10, description: "Multiple services, occasional events." },
    deluxe: { cost: 160, happinessImpact: 15, description: "Regular dining out, shows, events." }
  },
  healthcare: { // Weekly costs
    none: { cost: 0, healthImpact: -10, description: "No health insurance. High risk." },
    minimal: { cost: 30, healthImpact: -5, description: "Catastrophic coverage only." },
    basic: { cost: 85, healthImpact: 5, description: "Basic health insurance." },
    comprehensive: { cost: 160, healthImpact: 10, description: "Good health insurance." },
    premium: { cost: 260, healthImpact: 15, description: "Excellent health insurance." }
  },
  education: { // Weekly costs
    none: { baseCost: 0, skillImpact: 0, description: "No investment in education." },
    selfLearning: { baseCost: 20, skillImpact: 1, description: "Self-directed learning." },
    onlineCourses: { baseCost: 40, skillImpact: 2, description: "Structured online courses." },
    communityClass: { baseCost: 70, skillImpact: 3, description: "In-person community classes." },
    nightSchool: { baseCost: 110, skillImpact: 5, description: "Formal evening education." },
    degreePath: { baseCost: 220, skillImpact: 8, description: "Working towards a degree." }
  },
  transportation: { // Weekly costs
    bicycle: { weeklyCost: 5, happinessImpact: 2, healthImpact: 5, description: "Cycling is cheap and healthy, but slow and weather-dependent." },
    publicTransit: { weeklyCost: 30, happinessImpact: -5, description: "Using public transportation." },
    usedCar: { weeklyCost: 70, happinessImpact: 5, description: "Reliable used vehicle with expenses." },
    newCar: { weeklyCost: 130, happinessImpact: 10, description: "New vehicle with higher payments." },
    rideshare: { weeklyCost: 110, happinessImpact: 0, description: "Using rideshare services." }
  },
  family: { // Per dependent, per week
    costPerDependent: 160, happinessBonusPerDependent: 5,
    descriptions: { dependent: "Each dependent adds expenses but can increase happiness." }
  },
  amenities: { // Monthly costs
    basicUtilitiesPerMonth: 270, internetPerMonth: 80, cellPhonePerMonth: 65,
    descriptions: { utilities: "Electricity, water, gas, trash.", internet: "Home internet service.", cellPhone: "Basic cell phone plan." }
  },
  sideHustle: {
    delivery: { name: "Gig Delivery", description: "Deliver food/packages. Flexible hours, moderate income, adds stress.", baseWeeklyIncome: 45, stressImpact: 3 },
    tutoring: { name: "Online Tutoring", description: "Tutor students online. Requires knowledge, decent income, less stress.", baseWeeklyIncome: 65, stressImpact: 1 },
    freelance: { name: "Freelance Writing", description: "Write articles/copy online. Variable income.", baseWeeklyIncome: 55, stressImpact: 2 },
    petSitting: { name: "Pet Sitting", description: "Watch pets for people in your area. Low stress, moderate income.", baseWeeklyIncome: 50, stressImpact: 1 }
  },
  wellbeing: { // Cost per use
    gym: { name: "Gym Session", description: "Hit the gym for a workout.", cost: 25, healthBoost: 5, happinessBoost: 2 },
    meditation: { name: "Meditation App", description: "Use a guided meditation app.", cost: 10, healthBoost: 1, happinessBoost: 4 },
    hobby: { name: "Engage in Hobby", description: "Spend time on a relaxing hobby.", cost: 20, healthBoost: 0, happinessBoost: 6 },
    natureWalk: { name: "Nature Walk", description: "Take a refreshing walk in nature.", cost: 0, healthBoost: 3, happinessBoost: 3 },
    therapy: { name: "Therapy Session", description: "Talk through issues with a professional.", cost: 120, healthBoost: 0, happinessBoost: 15 },
    weekendTrip: { name: "Weekend Trip", description: "A short getaway to de-stress.", cost: 350, healthBoost: 5, happinessBoost: 25 },
  },
  savings: {
    description: "Manage your savings account with interest.",
  },
  investments: {
    safe: { name: "Safe Investments", description: "Low-risk options like bonds or CDs with steady returns.", baseReturnRate: 0.03, volatility: 0.01 },
    balanced: { name: "Balanced Portfolio", description: "Mix of stocks and bonds for moderate growth and risk.", baseReturnRate: 0.06, volatility: 0.05 },
    aggressive: { name: "Aggressive Stocks", description: "High-risk, high-reward stock investments with potential for big gains or losses.", baseReturnRate: 0.10, volatility: 0.15 },
    realEstate: { name: "Real Estate", description: "Property investments with rental income potential, affected by market conditions.", baseReturnRate: 0.08, volatility: 0.08 }
  },
  careers: {
    entry: { name: "Entry Level", incomeMultiplier: 1.0, requiredProductivity: 1, description: "Starting position with base pay." },
    mid: { name: "Mid Level", incomeMultiplier: 1.3, requiredProductivity: 3, description: "Promoted role with better pay." },
    senior: { name: "Senior Level", incomeMultiplier: 1.7, requiredProductivity: 5, description: "Experienced position with high pay." },
    executive: { name: "Executive Level", incomeMultiplier: 2.2, requiredProductivity: 8, description: "Top-tier role with premium pay." }
  },
};
export default baselineExpenses;
