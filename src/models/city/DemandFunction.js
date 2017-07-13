export default class DemandFunction {
  constructor ({ city, popularityPct, startConstantPrice }) {
    this.city = city
    this.popularityPct = popularityPct
    this.constantPrice = startConstantPrice

    this.calculateYearlyDemand()
  }

  calculateYearlyDemand () {
    this.collectedSupply = 0
    this.wholeDemand = this.demandedAmount()

    this.yearDemand = this.wholeDemand / 2
    
    this.slope = -1 / this.yearDemand
  }

  weekly (supply) {
    var price = this.pay(supply)
    this.collectedSupply += supply
    return price
  }

  percentageSupplied () {
    return this.collectedSupply / this.yearDemand
  }

  yearly () {
    this.calculateYearlyDemand()
  }

  pay (supply) {
    var newSupply = this.collectedSupply + supply
    var startPrice = this.priceAt(this.collectedSupply)
    var endPrice = this.priceAt(newSupply)

    console.log(startPrice + " " + endPrice)

    if(this.collectedSupply < this.yearDemand &&  newSupply > this.yearDemand) {
      var overSupply = (newSupply - this.yearDemand)
      return startPrice * (newSupply - overSupply) + (startPrice + endPrice) / 2 * overSupply
    }

    return (startPrice + endPrice) / 2 * supply
  }

  priceAt (supplyPoint) {
    return (supplyPoint <= this.yearDemand) ? 
    this.constantPrice : 
    Math.max(0, Math.floor(this.slope * (supplyPoint - this.yearDemand)))
  }

  demandedAmount () {
    let rvar = (-0.5 + Math.random()) * 20
    return (Math.floor(this.city.population * (this.popularityPct + rvar) / 100))
  }
}
