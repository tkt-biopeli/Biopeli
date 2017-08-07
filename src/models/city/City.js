import DemandCalculator from './DemandCalculator'
import {createLine} from '../logic/Functions'

 /**
  * Tracks the demand and population of the city
  * @param {String} name
  */
export default class City {
  constructor ({ 
      name, startPopulation, popularityPct, 
      demandRandomVariance, startPrice, 
      increaseAtOne, increaseAtTwo }) {
    this.name = name
    this.population = startPopulation
    this.turnipDemand = new DemandCalculator({
      city: this,
      popularityPct: popularityPct,
      demandRandomVariance: demandRandomVariance,
      startConstantPrice: startPrice
    })

    this.normalFunction = createLine(0.5, 1, 1, increaseAtOne)
    this.overFunction = createLine(1, increaseAtOne, 2, increaseAtTwo)
  }

  /**
   * Buys produced turnips for the city
   * according to weekly and sometimes yearly demand
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
      ? this.normalFunction(percentageSupplied)
      : this.overFunction(percentageSupplied)

    this.population *= percentage
    this.population = Math.ceil(this.population)
  }
}
