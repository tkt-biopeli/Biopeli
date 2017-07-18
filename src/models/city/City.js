import config from '../../config'
import DemandFunction from './DemandFunction'

 /**
  * Tracks the demand and population of the city
  * @param {String} name
  */
export default class City {
  constructor ({ name }) {
    this.name = name
    this.population = config.cityInitialPopulation
    this.weeklyTurnipDemand = 0
    this.yearlyTurnipDemand = 0
    this.harvestedTurnips = 0
    this.fulfilledAndEarnings = { percentage: 0, earnings: 0 }
    this.turnipDemandFn = new DemandFunction({
      city: this, popularityPct: 250, slope: 6
    })
  }

  /**
   * Buys produced turnips for the city according to weekly and sometimes yearly demand
   * @param {number} producedTurnips
   * @param {boolean} buyYearlyHarvest
   */
  buyTurnips (producedTurnips, buyYearlyHarvest) {
    this.fulfilledAndEarnings = this.turnipDemandFn.weekly(producedTurnips.weekly)
    this.harvestedTurnips += producedTurnips.yearly
    if (buyYearlyHarvest) this.buyYearlyTurnips(this.harvestedTurnips)
    return this.fulfilledAndEarnings
  }

  /**
   * Helper for buyTurnips to buy turnips according to yearly demand
   * @param {number} supply
   */
  buyYearlyTurnips (supply) {
    let yearlyfulfilledAndEarnings = this.turnipDemandFn.yearly(supply)
    this.harvestedTurnips = 0
    this.fulfilledAndEarnings.earnings += yearlyfulfilledAndEarnings.earnings
    this.fulfilledAndEarnings.percentage = yearlyfulfilledAndEarnings.percentage
  }

  /**
   * Increases the amount of population in the city
   * @param {number} amount - to be added to the existing amount
   */
  increasePopulation (amount) {
    this.population = this.population + amount
  }
}
