import DemandFunction from './DemandFunction'

 /**
  * Tracks the population of the city
  *
  * @param {String} name
  */
export default class City {
  constructor ({ name, startPopulation, popularityPct, demandRandomVariance, startPrice }) {
    this.name = name
    this.population = startPopulation
    this.turnipDemand = new DemandFunction({
      city: this,
      popularityPct: popularityPct,
      demandRandomVariance: demandRandomVariance,
      startConstantPrice: startPrice
    })
  }

  /**
   * City buys turnips
   *
   * @param {*} producedTurnips
   * @param {*} endOfTheYear
   */
  buyTurnips (producedTurnips, endOfTheYear) {
    let cash = this.turnipDemand.weekly(producedTurnips)
    if (endOfTheYear) this.endOfTheYear()
    return cash
  }

  /**
   * Increases population and updates city's demand for new year
   */
  endOfTheYear () {
    this.increasePopulation(this.turnipDemand.percentageSupplied())
    this.turnipDemand.calculateYearlyDemand()
  }

  /**
   * Increases population according to the demand fulfilled by the player
   */
  increasePopulation (percentageSupplied) {
    var percentage = percentageSupplied <= 1
      ? 0.5 * percentageSupplied + 0.75
      : percentageSupplied + 0.25

    this.population *= percentage
    this.population = Math.ceil(this.population)
  }
}
