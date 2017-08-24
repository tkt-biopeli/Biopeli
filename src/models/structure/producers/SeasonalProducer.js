/**
 * produces turnips all the time and gives 
 * the collected turnips at harvest seasons
 */
export default class SeasonalProducer {
  constructor ({ structureType, harvestWeeks }) {
    this.turnipYield = structureType.turnipYield
    this.harvestWeeks = harvestWeeks

    this.produced = 0
    this.wasHarvest = false
  }

  initialize (structure) { }

  /**
   * Calculates the produce generated
   * @param {TimeEvent} timeEvent
   * @return {number}
   */
  produce (timeEvent) {
    if (this.wasHarvest) {
      this.produced = 0
      this.wasHarvest = false
    }

    this.produced += this.turnipYield
    if (this.isHarvest(timeEvent)) this.wasHarvest = true
  }

  isHarvest (timeEvent) {
    return this.harvestWeeks.has(timeEvent.month + '.' + timeEvent.week)
  }

  producedAmount () {
    if (this.wasHarvest) return this.produced
    return 0
  }
}
