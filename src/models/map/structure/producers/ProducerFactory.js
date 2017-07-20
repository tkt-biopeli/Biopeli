import ContinuousProducer from './ContinuousProducer'
import SeasonalProducer from './SeasonalProducer'
import Refiner from './Refiner'
/**
 * Yields turnips during the harvesting period (month.week).
 */
const createSeasonalProducer = (harvestingWeeks, turnipYield, tile) => {
  return new SeasonalProducer({
    turnipYield: turnipYield,
    harvestWeeks: harvestingWeeks,
    tile: tile
  })
}

/**
 * Yields the same amount of turnips per week.
 */
const createContinuousProducer = (turnipYield, tile) => {
  return new ContinuousProducer({
    turnipYield: turnipYield,
    tile: tile
  })
}

/**
 * Creates refiner
 *
 * @param {*} inputTypes
 * @param {*} multiplier
 * @param {*} radius
 * @param {*} tile
 */
const createRefiner = (inputTypes, multiplier, radius, tile) => {
  return new Refiner({
    inputTypes: inputTypes,
    multiplier: multiplier,
    radius: radius,
    tile: tile
  })
}

/**
 * If the structure type is undefined, create a new one.
 */
const checkStructureType = (structureType) => {
  return structureType === undefined
    ? {
      harvestingWeeks: new Set(),
      continuousProduction: false,
      turnipYield: 0
    }
    : structureType
}

/**
 * Returns either a function that yields turnips weekly or one that
 * yields only during harvesting months, depending on the structure type.
 */
const createProducer = (structureType, tile) => {
  var sType = checkStructureType(structureType)

  return sType.refiner
    ? createRefiner(sType.inputTypes, sType.multiplier, sType.radius, tile)
    : sType.continuousProduction
      ? createContinuousProducer(sType.turnipYield, tile)
      : createSeasonalProducer(sType.harvestingWeeks, sType.turnipYield, tile)
}

export default { createProducer }
