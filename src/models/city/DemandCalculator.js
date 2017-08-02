import {createLine} from '../logic/Functions'

/**
 * Determines how much money the player gets from the produced turnips
 */
export default class DemandCalculator {
  constructor ({ city, popularityPct,
      demandRandomVariance, startConstantPrice }) {
    this.city = city
    this.popularityPct = popularityPct
    this.demandRandomVariance = demandRandomVariance
    this.constantPrice = startConstantPrice

    this.calculateYearlyDemand()
  }

  /**
   * Sets the yearly demand based on demanded amount and initializes helper values
   */
  calculateYearlyDemand () {
    this.collectedSupply = 0

    this.yearDemand = this.demandedAmount()
    this.wholeDemand = this.yearDemand * 2

    this.constantFunction = createLine(
      0, this.constantPrice, this.yearDemand, this.constantPrice
    )
    this.decreasingFunction = createLine(
      this.yearDemand, this.constantPrice, this.wholeDemand, 0
    )
  }

  /**
   * Done every week. Saves the supply and gives money of it
   *
   * @param {*} supply
   */
  weekly (supply) {
    var price = this.pay(supply)
    this.collectedSupply += supply
    return price
  }

  /**
   * Gives the percentage of demand the player has supplied this year
   */
  percentageSupplied () {
    return this.collectedSupply / this.yearDemand
  }

  /**
   * Calculates the amount of money player will get from the given supply. Is based on
   * how much player supplies and how much they have supplied.
   * @param {*} supply amount supplied this week
   */
  pay (supply) {
    var newSupply = this.collectedSupply + supply
    var startPrice = this.priceAt(this.collectedSupply)
    var endPrice = this.priceAt(newSupply)

    var year = this.collectedSupply < this.yearDemand && 
          newSupply > this.yearDemand
    var whole = this.collectedSupply < this.wholeDemand && 
          newSupply > this.wholeDemand
    if (year || whole) {
      var overSupply = (newSupply - this.yearDemand)
      if (newSupply > this.wholeDemand) {
        overSupply = (newSupply - this.wholeDemand)
      }
      var underSupply = supply - overSupply
      var underSupplyPrice = this.priceAt(underSupply + this.collectedSupply)
      return this.priceBetween(startPrice, underSupplyPrice, underSupply) +
        this.priceBetween(underSupplyPrice, endPrice, overSupply)
    }

    return this.priceBetween(startPrice, endPrice, supply)
  }

  /**
   * Gives the integral of the linear function between two price points. Gives the
   * money of the difference
   *
   * @param {*} startPrice
   * @param {*} endPrice
   * @param {*} supply
   */
  priceBetween (startPrice, endPrice, supply) {
    return (startPrice + endPrice) / 2 * supply
  }

  /**
   * The price of turnips at the point that the player has supplied
   */
  currentPrice () {
    return this.priceAt(this.collectedSupply)
  }

  /**
   * Gives the price at the given point of supply curve
   *
   * @param {*} supplyPoint
   */
  priceAt (supplyPoint) {
    return (supplyPoint <= this.yearDemand)
      ? this.constantFunction(supplyPoint)
      : Math.max(0, this.decreasingFunction(supplyPoint))
  }

  /**
   * Calculates the amount of turnips the city will demand next year. Is based on the
   * city size, given multiplier and random element
   */
  demandedAmount () {
    let rvar = (-0.5 + this.random()) * this.demandRandomVariance
    return Math.floor(this.city.population * this.popularityPct * (1 + rvar))
  }

  /**
   * Random for testing purposes
   */
  random () {
    return Math.random()
  }
}
