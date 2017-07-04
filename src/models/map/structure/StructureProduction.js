const createSeasonFn = (monthsToHarvest, harvestPoints) => {
  return (timeEvent) => {
    return monthsToHarvest.has(timeEvent.month) ? harvestPoints : 0
  }
}

const createConstFn = (basePoints) => {
  return () => {
    return basePoints
  }
}

const checkStructureType = (structureType) => {
  return structureType === undefined ? {
    monthsToHarvest: new Set([]),
    harvestPoints: 0,
    basePoints: 0,
    continuousProduction: false,
    turnipYield: 0
  } : structureType
}

const createProductionFn = (structureType) => {
  var sType = checkStructureType(structureType)
  var seasonFn = createSeasonFn(sType.monthsToHarvest, sType.harvestPoints)
  var constFn = createConstFn(sType.basePoints)

  return (timeEvent) => {
    var produced = 0
    produced += seasonFn(timeEvent)
    produced += constFn()
    return produced
  }
}

export default { createProductionFn }
