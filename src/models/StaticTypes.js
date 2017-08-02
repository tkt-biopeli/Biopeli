/**
 *
 * @typedef {object} StructureType
 * @property {string} name
 * @property {string} asset
 * @property {set.<string>} harvestingWeeks
 * @property {boolean} continuousProduction
 * @property {number} turnipYield
 */

/**
 * Harvesting week format 'month.week'.
 */
const structureTypes = {
  wheat_farm: {
    name: 'wheat farm',
    nameWithLanguage: 'viljatila',
    asset: 'wheat_farm',
    health: 12,
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 4,
    cost: 10000,
    pollution: 4,
    radiusForTileOwnership: 2,
    moisture_min: 40,
    moisture_max: 70,
    fertility_min: 40,
    fertility_max: 70
  },
  dairy_farm: {
    name: 'dairy farm',
    nameWithLanguage: 'maitotila',
    asset: 'dairy_farm',
    health: 15,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 6,
    cost: 15000,
    pollution: 5,
    radiusForTileOwnership: 2,
    moisture_min: 40,
    moisture_max: 70,
    fertility_min: 40,
    fertility_max: 70
  },
  berry_farm: {
    name: 'berry farm',
    nameWithLanguage: 'marjatila',
    asset: 'berry_farm',
    health: 8,
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 3,
    cost: 10000,
    pollution: 3,
    radiusForTileOwnership: 2,
    moisture_min: 40,
    moisture_max: 70,
    fertility_min: 40,
    fertility_max: 70
  },
  mill: {
    name: 'mill',
    nameWithLanguage: 'mylly',
    asset: 'mill',
    health: 20,
    refinery: true,
    buysFrom: ['wheat farm'],
    cost: 20000,
    multiplier: 2,
    pollution: 2,
    radiusForTileOwnership: 1,
    reach: 5
  }
}

/**
 * @typedef {object} TileType
 * @property {string} name
 * @property {string} asset
 * @property {StructureType[]} allowedStructures
 */

const tileTypes = {
  forest: {
    name: 'forest',
    nameWithLanguage: 'metsä',
    asset: 'forest',
    flowers: 10,
    allowedStructures: []
  },
  grass: {
    name: 'grass',
    nameWithLanguage: 'ruohikko',
    asset: 'grass',
    flowers: 10,
    allowedStructures: []
  },
  water: {
    name: 'water',
    nameWithLanguage: 'vesi',
    asset: 'water',
    flowers: 10,
    allowedStructures: []
  },
  field: {
    name: 'field',
    nameWithLanguage: 'pelto',
    asset: 'field',
    flowers: 10,
    allowedStructures: []
  },
  industrial: {
    name: 'industrial',
    nameWithLanguage: 'teollisuusalue',
    asset: 'industrial',
    flowers: 10,
    allowedStructures: []
  }
}

const addAllowedStructures = (structureTypes, tileTypes) => {
  tileTypes.grass.allowedStructures = [
    structureTypes.wheat_farm, 
    structureTypes.dairy_farm, 
    structureTypes.berry_farm, 
    structureTypes.mill
  ]
  tileTypes.water.allowedStructures = []
  tileTypes.field.allowedStructures = [structureTypes.mill]
  tileTypes.industrial.allowedStructures = [structureTypes.mill]
  return ({ structureTypes: structureTypes, tileTypes: tileTypes })
}

const StaticTypes = addAllowedStructures(structureTypes, tileTypes)

export default StaticTypes
