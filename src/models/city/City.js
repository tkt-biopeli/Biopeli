import DemandFunction from './DemandFunction'

 /**
  * Tracks the demand and population of the city
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
   * Buys produced turnips for the city according to weekly and sometimes yearly demand
   * @param {number} producedTurnips
   * @param {boolean} buyYearlyHarvest
   */
  buyTurnips (producedTurnips, endOfTheYear) {
    let cash = this.turnipDemand.weekly(producedTurnips)
    if (endOfTheYear) this.endOfTheYear()
    return cash
  }

  /**
   * Helper for buyTurnips to buy turnips according to yearly demand
   * @param {number} supply
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
