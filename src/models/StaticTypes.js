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
    asset: 'wheat_farm',
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 25,
    cost: 10000,
    pollution: 4,
    radiusForTileOwnership: 2
  },
  dairy_farm: {
    name: 'dairy farm',
    asset: 'dairy_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 35,
    cost: 15000,
    pollution: 5,
    radiusForTileOwnership: 2
  },
  berry_farm: {
    name: 'berry farm',
    asset: 'berry_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 20,
    cost: 10000,
    pollution: 3,
    radiusForTileOwnership: 2
  },
  mill: {
    name: 'mill',
    asset: 'mill',
    refinery: true,
    buysFrom: [],
    cost: 3000,
    multiplier: 10,
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
    asset: 'forest',
    flowers: 10,
    allowedStructures: []
  },
  grass: {
    name: 'grass',
    asset: 'grass',
    flowers: 10,
    allowedStructures: []
  },
  water: {
    name: 'water',
    asset: 'water',
    flowers: 10,
    allowedStructures: []
  },
  field: {
    name: 'field',
    asset: 'field',
    flowers: 10,
    allowedStructures: []
  },
  industrial: {
    name: 'industrial',
    asset: 'industrial',
    flowers: 10,
    allowedStructures: []
  }
}

const addAllowedStructures = (structureTypes, tileTypes) => {
  tileTypes.grass.allowedStructures = [structureTypes.wheat_farm, structureTypes.dairy_farm, structureTypes.berry_farm, structureTypes.mill]
  tileTypes.water.allowedStructures = []
  tileTypes.field.allowedStructures = [structureTypes.mill]
  tileTypes.industrial.allowedStructures = [structureTypes.mill]
  return ({ structureTypes: structureTypes, tileTypes: tileTypes })
}

const StaticTypes = addAllowedStructures(structureTypes, tileTypes)

export default StaticTypes
