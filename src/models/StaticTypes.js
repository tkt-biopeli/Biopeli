/**
 * Harvesting week format 'month.week'.
 */
const structureTypes = {
  wheat_farm: {
    name: 'wheat farm',
    asset: 'wheat_farm',
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 200,
    cost: 10000
  },
  dairy_farm: {
    name: 'dairy farm',
    asset: 'dairy_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 12,
    cost: 15000
  },
  berry_farm: {
    name: 'berry farm',
    asset: 'berry_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 10,
    cost: 10000
  }
}

const tileTypes = {
  forest: {
    name: 'forest',
    asset: 'forest',
    allowedStructures: []
  },
  grass: {
    name: 'grass',
    asset: 'grass',
    allowedStructures: []
  },
  water: {
    name: 'water',
    asset: 'water',
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
