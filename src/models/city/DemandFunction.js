export default class DemandFunction {
  constructor ({ city, popularityPct, demandRandomVariance, startConstantPrice }) {
    this.city = city
    this.popularityPct = popularityPct
    this.demandRandomVariance = demandRandomVariance
    this.constantPrice = startConstantPrice

    this.calculateYearlyDemand()
  }

  calculateYearlyDemand () {
    this.collectedSupply = 0

    this.yearDemand = this.demandedAmount()
    this.wholeDemand = this.yearDemand * 2

    this.slope = -1 * this.constantPrice / this.yearDemand
  }

  weekly (supply) {
    var price = this.pay(supply)
    this.collectedSupply += supply
    return price
  }

  percentageSupplied () {
    return this.collectedSupply / this.yearDemand
  }

  pay (supply) {
    var newSupply = this.collectedSupply + supply
    var startPrice = this.priceAt(this.collectedSupply)
    var endPrice = this.priceAt(newSupply)

    if ((this.collectedSupply < this.yearDemand && newSupply > this.yearDemand) || (this.collectedSupply < this.wholeDemand && newSupply > this.wholeDemand)) {
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

  priceBetween (startPrice, endPrice, supply) {
    return (startPrice + endPrice) / 2 * supply
  }

  currentPrice () {
    return this.priceAt(this.collectedSupply)
  }

  priceAt (supplyPoint) {
    return (supplyPoint <= this.yearDemand)
      ? this.constantPrice
      : Math.max(0, Math.floor(this.slope * (supplyPoint - this.yearDemand) + this.constantPrice))
  }

  demandedAmount () {
    let rvar = (-0.5 + this.random()) * this.demandRandomVariance
    return Math.floor(this.city.population * this.popularityPct * (1 + rvar))
  }

  random () {
    return Math.random()
  }
}
