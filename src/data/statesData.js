const statesData = [
  {
    "name": "Alabama",
    "minWage": 7.25,
    "medianBottom50Annual": 38000,
    "costIndices": { "housingIndex": 0.7, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "Alabama has a low cost of living, particularly for housing. However, it also has a low minimum wage and median income.",
      "population": "5,024,279",
      "costOfLivingRank": 3
    }
  },
  {
    "name": "Alaska",
    "minWage": 11.73,
    "medianBottom50Annual": 52000,
    "costIndices": { "housingIndex": 1.3, "foodIndex": 1.2, "utilitiesIndex": 1.5, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Alaska has a high cost of living, especially for housing and utilities. However, it has a higher minimum wage and no state income tax.",
      "population": "733,391",
      "costOfLivingRank": 48
    }
  },
  {
    "name": "Arizona",
    "minWage": 14.35,
    "medianBottom50Annual": 45000,
    "costIndices": { "housingIndex": 1.2, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Arizona has a moderate cost of living, with housing being the biggest expense. It has a higher minimum wage than the federal level.",
      "population": "7,151,502",
      "costOfLivingRank": 39
    }
  },
  {
    "name": "Arkansas",
    "minWage": 11.00,
    "medianBottom50Annual": 37000,
    "costIndices": { "housingIndex": 0.75, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "Arkansas has a low cost of living, but also a low median income. It has a state minimum wage higher than the federal level.",
      "population": "3,011,524",
      "costOfLivingRank": 4
    }
  },
  {
    "name": "California",
    "minWage": 16.00,
    "medianBottom50Annual": 55000,
    "costIndices": { "housingIndex": 2.0, "foodIndex": 1.3, "utilitiesIndex": 1.2, "educationCostIndex": 1.4 },
    "info": {
      "summary": "California has a very high cost of living, especially for housing. It has a high minimum wage and a large, diverse economy.",
      "population": "39,538,223",
      "costOfLivingRank": 49
    }
  },
  {
    "name": "Colorado",
    "minWage": 14.42,
    "medianBottom50Annual": 53000,
    "costIndices": { "housingIndex": 1.5, "foodIndex": 1.1, "utilitiesIndex": 1.0, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Colorado has a high cost of living, particularly for housing. It has a strong economy and a high minimum wage.",
      "population": "5,773,714",
      "costOfLivingRank": 43
    }
  },
  {
    "name": "Connecticut",
    "minWage": 15.69,
    "medianBottom50Annual": 58000,
    "costIndices": { "housingIndex": 1.25, "foodIndex": 1.1, "utilitiesIndex": 1.2, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Connecticut has a high cost of living, but also a high median income. It has a high minimum wage.",
      "population": "3,605,944",
      "costOfLivingRank": 45
    }
  },
  {
    "name": "Delaware",
    "minWage": 13.25,
    "medianBottom50Annual": 48000,
    "costIndices": { "housingIndex": 1.1, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Delaware has a moderate cost of living and a median income that is slightly above the national average. It has a state minimum wage that is higher than the federal level.",
      "population": "989,948",
      "costOfLivingRank": 36
    }
  },
  {
    "name": "Florida",
    "minWage": 12.00,
    "medianBottom50Annual": 42000,
    "costIndices": { "housingIndex": 1.15, "foodIndex": 1.1, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Florida has a moderate cost of living, with a growing population and economy. It has a state minimum wage that is higher than the federal level.",
      "population": "21,538,187",
      "costOfLivingRank": 31
    }
  },
  {
    "name": "Georgia",
    "minWage": 7.25,
    "medianBottom50Annual": 43000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Georgia has a moderate cost of living and a growing economy. It has a low minimum wage.",
      "population": "10,711,908",
      "costOfLivingRank": 22
    }
  },
  {
    "name": "Hawaii",
    "minWage": 14.00,
    "medianBottom50Annual": 60000,
    "costIndices": { "housingIndex": 2.2, "foodIndex": 1.6, "utilitiesIndex": 1.8, "educationCostIndex": 1.5 },
    "info": {
      "summary": "Hawaii has the highest cost of living in the nation, largely due to housing and import costs. It has a high minimum wage and a strong tourism industry.",
      "population": "1,455,271",
      "costOfLivingRank": 50
    }
  },
  {
    "name": "Idaho",
    "minWage": 7.25,
    "medianBottom50Annual": 41000,
    "costIndices": { "housingIndex": 1.0, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Idaho has a moderate cost of living and a growing population. It has a low minimum wage.",
      "population": "1,839,106",
      "costOfLivingRank": 26
    }
  },
  {
    "name": "Illinois",
    "minWage": 14.00,
    "medianBottom50Annual": 49000,
    "costIndices": { "housingIndex": 0.95, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Illinois has a moderate cost of living, with a large and diverse economy. It has a high minimum wage.",
      "population": "12,812,508",
      "costOfLivingRank": 29
    }
  },
  {
    "name": "Indiana",
    "minWage": 7.25,
    "medianBottom50Annual": 42000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Indiana has a low cost of living and a strong manufacturing sector. It has a low minimum wage.",
      "population": "6,785,528",
      "costOfLivingRank": 11
    }
  },
  {
    "name": "Iowa",
    "minWage": 7.25,
    "medianBottom50Annual": 43000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Iowa has a low cost of living and a strong agricultural sector. It has a low minimum wage.",
      "population": "3,190,369",
      "costOfLivingRank": 12
    }
  },
  {
    "name": "Kansas",
    "minWage": 7.25,
    "medianBottom50Annual": 42000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Kansas has a low cost of living and a strong agricultural and aviation industry. It has a low minimum wage.",
      "population": "2,937,880",
      "costOfLivingRank": 10
    }
  },
  {
    "name": "Kentucky",
    "minWage": 7.25,
    "medianBottom50Annual": 39000,
    "costIndices": { "housingIndex": 0.75, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "Kentucky has a low cost of living and a diverse economy that includes manufacturing and healthcare. It has a low minimum wage.",
      "population": "4,505,836",
      "costOfLivingRank": 8
    }
  },
  {
    "name": "Louisiana",
    "minWage": 7.25,
    "medianBottom50Annual": 39000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Louisiana has a low cost of living and a strong oil and gas industry. It has a low minimum wage.",
      "population": "4,657,757",
      "costOfLivingRank": 14
    }
  },
  {
    "name": "Maine",
    "minWage": 14.15,
    "medianBottom50Annual": 46000,
    "costIndices": { "housingIndex": 1.1, "foodIndex": 1.0, "utilitiesIndex": 1.1, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Maine has a moderate cost of living and a strong tourism industry. It has a high minimum wage.",
      "population": "1,362,359",
      "costOfLivingRank": 37
    }
  },
  {
    "name": "Maryland",
    "minWage": 15.00,
    "medianBottom50Annual": 60000,
    "costIndices": { "housingIndex": 1.4, "foodIndex": 1.1, "utilitiesIndex": 1.1, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Maryland has a high cost of living, but also a high median income. It has a high minimum wage and a strong technology and government sector.",
      "population": "6,177,224",
      "costOfLivingRank": 46
    }
  },
  {
    "name": "Massachusetts",
    "minWage": 15.00,
    "medianBottom50Annual": 62000,
    "costIndices": { "housingIndex": 1.6, "foodIndex": 1.2, "utilitiesIndex": 1.2, "educationCostIndex": 1.3 },
    "info": {
      "summary": "Massachusetts has a very high cost of living, but also a high median income. It has a high minimum wage and a strong technology and education sector.",
      "population": "7,029,917",
      "costOfLivingRank": 47
    }
  },
  {
    "name": "Michigan",
    "minWage": 10.33,
    "medianBottom50Annual": 44000,
    "costIndices": { "housingIndex": 0.85, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Michigan has a low cost of living and a strong manufacturing sector. It has a state minimum wage that is higher than the federal level.",
      "population": "10,077,331",
      "costOfLivingRank": 16
    }
  },
  {
    "name": "Minnesota",
    "minWage": 10.85,
    "medianBottom50Annual": 51000,
    "costIndices": { "housingIndex": 1.0, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Minnesota has a moderate cost of living and a diverse economy. It has a state minimum wage that is higher than the federal level.",
      "population": "5,706,494",
      "costOfLivingRank": 30
    }
  },
  {
    "name": "Mississippi",
    "minWage": 7.25,
    "medianBottom50Annual": 35000,
    "costIndices": { "housingIndex": 0.65, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "Mississippi has the lowest cost of living in the nation, but also the lowest median income. It has a low minimum wage.",
      "population": "2,961,279",
      "costOfLivingRank": 1
    }
  },
  {
    "name": "Missouri",
    "minWage": 12.30,
    "medianBottom50Annual": 41000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Missouri has a low cost of living and a diverse economy. It has a state minimum wage that is higher than the federal level.",
      "population": "6,154,913",
      "costOfLivingRank": 9
    }
  },
  {
    "name": "Montana",
    "minWage": 10.30,
    "medianBottom50Annual": 42000,
    "costIndices": { "housingIndex": 1.1, "foodIndex": 1.0, "utilitiesIndex": 0.9, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Montana has a moderate cost of living and a strong tourism and natural resources industry. It has a state minimum wage that is higher than the federal level.",
      "population": "1,084,225",
      "costOfLivingRank": 34
    }
  },
  {
    "name": "Nebraska",
    "minWage": 12.00,
    "medianBottom50Annual": 44000,
    "costIndices": { "housingIndex": 0.85, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Nebraska has a low cost of living and a strong agricultural sector. It has a state minimum wage that is higher than the federal level.",
      "population": "1,961,504",
      "costOfLivingRank": 15
    }
  },
  {
    "name": "Nevada",
    "minWage": 12.00,
    "medianBottom50Annual": 46000,
    "costIndices": { "housingIndex": 1.3, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Nevada has a moderate cost of living and a strong tourism and entertainment industry. It has a state minimum wage that is higher than the federal level.",
      "population": "3,104,614",
      "costOfLivingRank": 40
    }
  },
  {
    "name": "New Hampshire",
    "minWage": 7.25,
    "medianBottom50Annual": 56000,
    "costIndices": { "housingIndex": 1.2, "foodIndex": 1.1, "utilitiesIndex": 1.1, "educationCostIndex": 1.2 },
    "info": {
      "summary": "New Hampshire has a high cost of living, but also a high median income. It has a low minimum wage, but no state income tax.",
      "population": "1,377,529",
      "costOfLivingRank": 44
    }
  },
  {
    "name": "New Jersey",
    "minWage": 15.13,
    "medianBottom50Annual": 59000,
    "costIndices": { "housingIndex": 1.3, "foodIndex": 1.1, "utilitiesIndex": 1.1, "educationCostIndex": 1.2 },
    "info": {
      "summary": "New Jersey has a high cost of living, but also a high median income. It has a high minimum wage and a diverse economy.",
      "population": "9,288,994",
      "costOfLivingRank": 42
    }
  },
  {
    "name": "New Mexico",
    "minWage": 12.00,
    "medianBottom50Annual": 38000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "New Mexico has a low cost of living and a unique culture. It has a state minimum wage that is higher than the federal level.",
      "population": "2,117,522",
      "costOfLivingRank": 21
    }
  },
  {
    "name": "New York",
    "minWage": 16.00,
    "medianBottom50Annual": 61000,
    "costIndices": { "housingIndex": 1.7, "foodIndex": 1.2, "utilitiesIndex": 1.1, "educationCostIndex": 1.3 },
    "info": {
      "summary": "New York has a very high cost of living, especially in New York City. It has a high minimum wage and a large, diverse economy.",
      "population": "20,201,249",
      "costOfLivingRank": 48
    }
  },
  {
    "name": "North Carolina",
    "minWage": 7.25,
    "medianBottom50Annual": 43000,
    "costIndices": { "housingIndex": 0.95, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "North Carolina has a moderate cost of living and a growing technology and research sector. It has a low minimum wage.",
      "population": "10,439,388",
      "costOfLivingRank": 24
    }
  },
  {
    "name": "North Dakota",
    "minWage": 7.25,
    "medianBottom50Annual": 47000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "North Dakota has a low cost of living and a strong energy sector. It has a low minimum wage.",
      "population": "779,094",
      "costOfLivingRank": 20
    }
  },
  {
    "name": "Ohio",
    "minWage": 10.45,
    "medianBottom50Annual": 43000,
    "costIndices": { "housingIndex": 0.8, "foodIndex": 0.9, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Ohio has a low cost of living and a strong manufacturing sector. It has a state minimum wage that is higher than the federal level.",
      "population": "11,799,448",
      "costOfLivingRank": 13
    }
  },
  {
    "name": "Oklahoma",
    "minWage": 7.25,
    "medianBottom50Annual": 39000,
    "costIndices": { "housingIndex": 0.75, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "Oklahoma has a very low cost of living and a strong energy sector. It has a low minimum wage.",
      "population": "3,959,353",
      "costOfLivingRank": 2
    }
  },
  {
    "name": "Oregon",
    "minWage": 14.20,
    "medianBottom50Annual": 50000,
    "costIndices": { "housingIndex": 1.4, "foodIndex": 1.1, "utilitiesIndex": 1.0, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Oregon has a high cost of living, particularly for housing. It has a high minimum wage and a strong technology and outdoor recreation industry.",
      "population": "4,237,256",
      "costOfLivingRank": 41
    }
  },
  {
    "name": "Pennsylvania",
    "minWage": 7.25,
    "medianBottom50Annual": 46000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Pennsylvania has a moderate cost of living and a diverse economy. It has a low minimum wage.",
      "population": "13,002,700",
      "costOfLivingRank": 25
    }
  },
  {
    "name": "Rhode Island",
    "minWage": 14.00,
    "medianBottom50Annual": 54000,
    "costIndices": { "housingIndex": 1.2, "foodIndex": 1.1, "utilitiesIndex": 1.1, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Rhode Island has a high cost of living, but also a high median income. It has a high minimum wage.",
      "population": "1,097,379",
      "costOfLivingRank": 38
    }
  },
  {
    "name": "South Carolina",
    "minWage": 7.25,
    "medianBottom50Annual": 40000,
    "costIndices": { "housingIndex": 0.85, "foodIndex": 0.9, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "South Carolina has a low cost of living and a strong manufacturing and tourism industry. It has a low minimum wage.",
      "population": "5,118,425",
      "costOfLivingRank": 18
    }
  },
  {
    "name": "South Dakota",
    "minWage": 11.20,
    "medianBottom50Annual": 43000,
    "costIndices": { "housingIndex": 0.85, "foodIndex": 0.9, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "South Dakota has a low cost of living and a strong agricultural and tourism industry. It has a state minimum wage that is higher than the federal level.",
      "population": "886,667",
      "costOfLivingRank": 17
    }
  },
  {
    "name": "Tennessee",
    "minWage": 7.25,
    "medianBottom50Annual": 41000,
    "costIndices": { "housingIndex": 0.85, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Tennessee has a low cost of living and a strong music and tourism industry. It has a low minimum wage.",
      "population": "6,910,840",
      "costOfLivingRank": 19
    }
  },
  {
    "name": "Texas",
    "minWage": 7.25,
    "medianBottom50Annual": 44000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 0.9, "utilitiesIndex": 1.0, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Texas has a moderate cost of living and a large, diverse economy. It has a low minimum wage.",
      "population": "29,145,505",
      "costOfLivingRank": 23
    }
  },
  {
    "name": "Utah",
    "minWage": 7.25,
    "medianBottom50Annual": 48000,
    "costIndices": { "housingIndex": 1.2, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Utah has a moderate cost of living and a strong technology and outdoor recreation industry. It has a low minimum wage.",
      "population": "3,271,616",
      "costOfLivingRank": 33
    }
  },
  {
    "name": "Vermont",
    "minWage": 13.67,
    "medianBottom50Annual": 51000,
    "costIndices": { "housingIndex": 1.15, "foodIndex": 1.1, "utilitiesIndex": 1.1, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Vermont has a high cost of living and a strong tourism and agriculture industry. It has a high minimum wage.",
      "population": "643,077",
      "costOfLivingRank": 40
    }
  },
  {
    "name": "Virginia",
    "minWage": 12.00,
    "medianBottom50Annual": 52000,
    "costIndices": { "housingIndex": 1.1, "foodIndex": 1.0, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Virginia has a moderate cost of living and a diverse economy that includes technology, agriculture, and government. It has a state minimum wage that is higher than the federal level.",
      "population": "8,631,393",
      "costOfLivingRank": 32
    }
  },
  {
    "name": "Washington",
    "minWage": 16.28,
    "medianBottom50Annual": 57000,
    "costIndices": { "housingIndex": 1.5, "foodIndex": 1.1, "utilitiesIndex": 1.0, "educationCostIndex": 1.2 },
    "info": {
      "summary": "Washington has a high cost of living, particularly for housing. It has a high minimum wage and a strong technology and aerospace industry.",
      "population": "7,705,281",
      "costOfLivingRank": 42
    }
  },
  {
    "name": "West Virginia",
    "minWage": 8.75,
    "medianBottom50Annual": 36000,
    "costIndices": { "housingIndex": 0.7, "foodIndex": 0.9, "utilitiesIndex": 0.9, "educationCostIndex": 0.9 },
    "info": {
      "summary": "West Virginia has a low cost of living and a strong coal mining industry. It has a state minimum wage that is higher than the federal level.",
      "population": "1,793,716",
      "costOfLivingRank": 6
    }
  },
  {
    "name": "Wisconsin",
    "minWage": 7.25,
    "medianBottom50Annual": 46000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 0.9, "utilitiesIndex": 1.0, "educationCostIndex": 1.1 },
    "info": {
      "summary": "Wisconsin has a moderate cost of living and a strong manufacturing and agriculture industry. It has a low minimum wage.",
      "population": "5,893,718",
      "costOfLivingRank": 27
    }
  },
  {
    "name": "Wyoming",
    "minWage": 7.25,
    "medianBottom50Annual": 45000,
    "costIndices": { "housingIndex": 0.9, "foodIndex": 1.0, "utilitiesIndex": 0.9, "educationCostIndex": 1.0 },
    "info": {
      "summary": "Wyoming has a low cost of living and a strong mining and tourism industry. It has a low minimum wage.",
      "population": "576,851",
      "costOfLivingRank": 28
    }
  }
]
export default statesData;
