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
    turnipYield: 12,
    cost: 10000,
    pollution: 4
  },
  dairy_farm: {
    name: 'dairy farm',
    asset: 'dairy_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 16,
    cost: 15000,
    pollution: 5
  },
  berry_farm: {
    name: 'berry farm',
    asset: 'berry_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 10,
    cost: 10000,
    pollution: 3
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
  }
}

const addAllowedStructures = (structureTypes, tileTypes) => {
  tileTypes.grass.allowedStructures = [structureTypes.wheat_farm, structureTypes.dairy_farm, structureTypes.berry_farm]
  tileTypes.water.allowedStructures = []
  return ({ structureTypes: structureTypes, tileTypes: tileTypes })
}

const StaticTypes = addAllowedStructures(structureTypes, tileTypes)

export default StaticTypes
