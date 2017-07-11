/**
 * Yields turnips during the harvesting period (month.week).
 */
const createPeriodicProductionFn = (harvestingWeeks, turnipYield) => {
  return (timeEvent) => {
    return harvestingWeeks.has(timeEvent.month + '.' + timeEvent.week)
      ? turnipYield
      : 0
  }
}

/**
 * Yields the same amount of turnips per week.
 */
const createContinuousProductionFn = (turnipYield) => {
  return () => {
    return turnipYield
  }
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
const createProductionFn = (structureType, tile) => {
  var sType = checkStructureType(structureType)

  return sType.continuousProduction * tile.flowers
    ? createContinuousProductionFn(sType.turnipYield)
    : createPeriodicProductionFn(sType.harvestingWeeks, sType.turnipYield)
}

export default { createProductionFn }
