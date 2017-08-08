const structureTypes = {
  wheat_farm: {
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
    fertilityMax: 70
  },
  dairy_farm: {
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
    fertilityMax: 70
  },
  berry_farm: {
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
    fertilityMax: 70
  },
  mill: {
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
    reach: 5
  }
}

export default structureTypes
