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
const createRefiner = (tileFinder, inputTypes, multiplier, radius, tile) => {
  return new Refiner({
    inputTypes: inputTypes,
    zone: tileFinder.findTilesInDistanceOf(tile, radius),
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
const createProducer = (tileFinder, structureType, tile) => {
  var sType = checkStructureType(structureType)

<<<<<<< HEAD
  return sType.refinery
    ? createRefiner(sType.buysFrom, sType.multiplier, sType.reach, tile)
=======
  return sType.refiner
    ? createRefiner(tileFinder, sType.inputTypes, sType.multiplier, sType.radius, tile)
>>>>>>> jalostus
    : sType.continuousProduction
      ? createContinuousProducer(sType.turnipYield, tile)
      : createSeasonalProducer(sType.harvestingWeeks, sType.turnipYield, tile)
}

export default { createProducer }
