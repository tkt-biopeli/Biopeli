/**
 * produces turnips all the time and gives the collected turnips at harvest seasons
 */
export default class SeasonalProducer {
  constructor ({ turnipYield, harvestWeeks }) {
    this.turnipYield = turnipYield
    this.harvestWeeks = harvestWeeks

    this.produced = 0
  }

  productionThisWeek (timeEvent) {
    this.produced += this.turnipYield

    if (this.harvestWeeks.has(timeEvent.month + '.' + timeEvent.week)) {
      var harvest = this.produced
      this.produced = 0
      return harvest
    }

    return 0
  }
}
