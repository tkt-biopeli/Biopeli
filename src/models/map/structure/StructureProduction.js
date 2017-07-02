const createSeasonFn = () => {
  return (timeEvent) => {
    return timeEvent.month == 8 ? 100 : 0
  }
}

const createConstFn = () => {
  return () => {
    return 2
  }
}

const createProductionFn = () => {
  var seasonFn = createSeasonFn()
  var constFn = createConstFn()
  return (timeEvent) => {
    var produced = 0
    produced += seasonFn(timeEvent)
    produced += constFn()
    return produced
  }
}

export default { createProductionFn }
