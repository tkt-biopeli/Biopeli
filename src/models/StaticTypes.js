/**
 * Harvesting week format 'month.week'.
 */
const structureTypes = {
  farm: {
    name: 'farm',
    asset: 'farm',
    harvestingWeeks: new Set(['8.1']),
    continuousProduction: false,
    turnipYield: 200
  },
  dairy_farm: {
    name: 'dairy farm',
    asset: 'dairy_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 12
  },
  berry_farm: {
    name: 'berry farm',
    asset: 'berry_farm',
    harvestingWeeks: new Set(),
    continuousProduction: true,
    turnipYield: 10
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
  tileTypes.forest.allowedStructures = [structureTypes.farm]
  tileTypes.grass.allowedStructures = [structureTypes.farm, structureTypes.dairy_farm, structureTypes.berry_farm]
  tileTypes.water.allowedStructures = []
  return ({ structureTypes: structureTypes, tileTypes: tileTypes })
}

const StaticTypes = addAllowedStructures(structureTypes, tileTypes)

export default StaticTypes
