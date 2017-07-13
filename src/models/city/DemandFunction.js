export default class DemandFunction {
  constructor ({ city, popularityPct, slope }) {
    this.city = city
    this.popularityPct = popularityPct
    this.slope = slope

    this.calculateYearlyDemand()
  }

  calculateYearlyDemand () {
    this.collectedSupply = 0
    this.yearDemand = this.demandedAmount()

    this.constantPoint = this.yearDemand / 2
    this.constantPrice = this.slope * this.constantPoint * -1
  }

  weekly (supply) {
    var price = this.pay(supply)
    this.collectedSupply += supply
    return price
  }

  yearly () {
    this.calculateYearlyDemand()
  }

  pay (supply) {
    var newSupply = this.collectedSupply + supply
    var startPrice = this.priceAt(this.collectedSupply)
    var endPrice = this.priceAt(newSupply)

    if(this.collectedSupply < this.constantPoint &&  newSupply > this.constantPoint) {
      var overSupply = (newSupply - this.constantPoint)
      return startPrice * (newSupply - overSupply) + (startPrice + endPrice) / 2 * overSupply
    }

    return (startPrice + endPrice) / 2 * supply
  }

  priceAt (supplyPoint) {
    return (supplyPoint < this.constantPoint) ? 
    this.constantPrice : 
    Math.max(0, this.slope * (supplyPoint - this.yearDemand))
  }

  demandedAmount () {
    let rvar = (-0.5 + Math.random()) * 20
    return (Math.floor(this.city.population * (this.popularityPct + rvar) / 100))
  }
}
