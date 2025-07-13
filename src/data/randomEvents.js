const randomEvents = [
  {
    name: "Unexpected Bill",
    description: "An unexpected medical bill or repair cost.",
    chance: 0.05,
    costRange: [50, 300],
    healthChange: -2,
    happinessChange: -5,
  },
  {
    name: "Found Cash",
    description: "You found some cash on the street!",
    chance: 0.02,
    costRange: [-100, -20],
    happinessChange: 5,
  },
  {
    name: "Feeling Sick",
    description: "You're not feeling well this week.",
    chance: 0.08,
    costRange: [10, 50],
    healthChange: -10,
    happinessChange: -5,
  },
  {
    name: "Minor Accident",
    description: "A small fender bender or household accident causes minor repair costs.",
    chance: 0.03,
    costRange: [100, 500],
    happinessChange: -8,
  },
  {
    name: "Productivity Boost",
    description: "You had a particularly productive week at work!",
    chance: 0.04,
    happinessChange: 3,
  },
  {
    name: "Layoff Scare",
    description: "Rumors of layoffs at your workplace are causing stress.",
    chance: 0.02,
    happinessChange: -10,
  },
  {
    name: "Actual Layoff",
    description: "Unfortunately, you've been laid off.",
    chance: 0.01,
    healthChange: -5,
    happinessChange: -20,
    effect: "layoff"
  },
  {
    name: "Sudden Celebration",
    description: "An unexpected celebration or social event.",
    chance: 0.03,
    costRange: [20, 80],
    happinessChange: 10,
  },
  {
    name: "Child's School Event",
    description: "Your child has a school event that requires some spending.",
    chance: 0.05,
    costRange: [15, 60],
    happinessChange: 2,
    requiresChildren: true,
  },
  {
    name: "Winter Blues",
    description: "The cold weather is getting you down.",
    chance: 0.1,
    happinessChange: -5,
    seasonal: 'winter'
  },
  {
    name: "Summer Fun Cost",
    description: "Extra costs for summer activities or higher AC bills.",
    chance: 0.08,
    costRange: [30,150],
    happinessChange: 2,
    seasonal: 'summer'
  },
  {
    name: "Gift from a Friend",
    description: "A friend gave you a thoughtful gift.",
    chance: 0.03,
    costRange: [-50, -20],
    happinessChange: 10,
  },
  {
    name: "Car Trouble",
    description: "Your car needs unexpected repairs.",
    chance: 0.04,
    costRange: [200, 800],
    happinessChange: -10,
    requiresTransportation: "car"
  },
  {
    name: "Public Transit Delays",
    description: "Public transit is running late, causing you stress.",
    chance: 0.06,
    happinessChange: -5,
    requiresTransportation: "publicTransit"
  },
  {
    name: "Good News!",
    description: "You received some unexpected good news.",
    chance: 0.03,
    happinessChange: 15,
  },
  {
    name: "Bad News...",
    description: "You received some unexpected bad news.",
    chance: 0.03,
    happinessChange: -15,
  },
  {
    name: "Workplace Conflict",
    description: "A conflict at work is causing you stress.",
    chance: 0.05,
    happinessChange: -10,
  },
  {
    name: "Unexpected Day Off",
    description: "You get an unexpected day off from work.",
    chance: 0.02,
    happinessChange: 10,
  },
  {
    name: "Jury Duty",
    description: "You've been summoned for jury duty.",
    chance: 0.01,
    costRange: [50, 100],
    happinessChange: -5,
  },
  {
    name: "Won a Small Lottery",
    description: "You won a small amount in the lottery!",
    chance: 0.005,
    costRange: [-500, -100],
    happinessChange: 20,
  },
  {
    name: "Identity Theft Scare",
    description: "You had to spend time and money dealing with an identity theft scare.",
    chance: 0.01,
    costRange: [100, 300],
    happinessChange: -15,
  },
  {
    name: "Productivity Slump",
    description: "You're feeling unmotivated and your productivity takes a hit.",
    chance: 0.05,
    productivityChange: -0.1, // Reduce productivity by 10%
    happinessChange: -5,
  },
  {
    name: "Innovative Idea",
    description: "You came up with a brilliant idea that boosts your productivity.",
    chance: 0.02,
    productivityChange: 0.15, // Increase productivity by 15%
    happinessChange: 10,
  }
];

export default randomEvents;