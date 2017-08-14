const structureTypes = {
  wheat_farm: {
    type: "producer_structure",
    name: 'wheat_farm',
    nameWithLanguage: 'viljatila',
    asset: 'wheat_farm',
    health: 12,
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 4,
    cost: 10000,
    pollution: 4,
    radiusForTileOwnership: 2,
    moistureMin: 40,
    moistureMax: 70,
    fertilityMin: 40,
    fertilityMax: 70,
    moveCosts: {
      "grass": 1,
      "water": 5,
      "water_field": 5,
      "forest": 1,
      "field": 1,
      "industrial": 1
    },
    takesOwnershipOf: ["grass"],
    farmland: "field"
  },
  dairy_farm: {
    type: "producer_structure",
    name: 'dairy_farm',
    nameWithLanguage: 'maitotila',
    asset: 'dairy_farm',
    health: 15,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 6,
    cost: 15000,
    pollution: 5,
    radiusForTileOwnership: 2,
    moistureMin: 40,
    moistureMax: 70,
    fertilityMin: 40,
    fertilityMax: 70,
    moveCosts: {
      "grass": 1,
      "water": 5,
      "water_field": 5,
      "forest": 2,
      "field": 1,
      "industrial": 1
    },
    takesOwnershipOf: ["grass"],
    farmland: "field"
  },
  berry_farm: {
    type: "producer_structure",
    name: 'berry_farm',
    nameWithLanguage: 'marjatila',
    asset: 'berry_farm',
    health: 8,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 3,
    cost: 10000,
    pollution: 3,
    radiusForTileOwnership: 2,
    moistureMin: 40,
    moistureMax: 70,
    fertilityMin: 40,
    fertilityMax: 70,
    moveCosts: {
      "grass": 1,
      "water": 5,
      "water_field": 5,
      "forest": 2,
      "field": 1,
      "industrial": 1
    },
    takesOwnershipOf: ["grass"],
    farmland: "field"
  },
  mill: {
    type: "refinery",
    name: 'mill',
    nameWithLanguage: 'mylly',
    asset: 'mill',
    health: 20,
    type: 'refinery',
    buysFrom: ['wheat_farm'],
    cost: 20000,
    multiplier: 2,
    pollution: 2,
    radiusForTileOwnership: 1,
    reach: 5,
    moveCosts: {
      "grass": 1,
      "water": 5,
      "water_field": 5,
      "forest": 2,
      "field": 1,
      "industrial": 1
    },
    takesOwnershipOf: ["grass", "field", "industrial", "forest"],
    farmland: "industrial"
  },
  fishery: {
    type: "producer_structure",
    name: "fishery",
    nameWithLanguage: "Kalanviljelylaitos",
    asset: "fishery",
    health: 15,
    pollution: 5,
    cost: 15000,
    radiusForTileOwnership: 2,
    harvestingWeeks: [],
    continuousProduction: true,
    turnipYield: 6,
    moistureMin: 75,
    moistureMax: 100,
    fertilityMin: 40,
    fertilityMax: 90,
    moveCosts: {
      "grass": 10,
      "water": 1,
      "water_field": 2,
      "forest": 10,
      "field": 10,
      "industrial": 10
    },
    takesOwnershipOf: ["water"],
    farmland: "water_field"
  },
  fish_refinery: {

    type: "refinery",
    name: "fish_refinery",
    nameWithLanguage: "Kalajalostamo",
    asset: "fish_refinery",
    health: 20,
    pollution: 2,
    cost: 20000,
    radiusForTileOwnership: 1,
    multiplier: 2,
    reach: 7,
    buysFrom: [
      "fishery"
    ],
    moveCosts: {
      "grass": 5,
      "water": 1,
      "water_field": 1,
      "forest": 10,
      "field": 10,
      "industrial": 1
    },
    takesOwnershipOf: ["grass"],
    farmland: "industrial"
  }
  
}

export default structureTypes
