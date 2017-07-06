export default class DemandFunction {
  constructor ({ city, popularityPct, slope }) {
    this.city = city
    this.popularityPct = popularityPct
    this.slope = slope
  }

  weekly (supply) {
    let demand = this.demandedAmount()
    this.city.weeklyTurnipDemand = demand / 2
    this.city.yearlyTurnipDemand += demand / 4
    return this.calculate(supply, demand, true)
  }

  yearly (supply) {
    let demand = this.city.yearlyTurnipDemand * 2
    let fulfilledAndEarnings = this.calculate(supply, demand)
    this.city.yearlyTurnipDemand = 0
    return fulfilledAndEarnings
  }

  calculate (supply, demand, weekly) {
    let ratio = weekly ? supply / this.city.weeklyTurnipDemand : supply / this.city.yearlyTurnipDemand
    let fulfilledPct = ratio < 1 ? ratio * 100 : 100
    let slope = weekly ? this.slope : this.slope * 6

    return {
      percentage: Math.floor(fulfilledPct),
      earnings: Math.floor(supply * this.price(supply, demand, slope))
    }
  }

  price (supply, demand, slope) {
    let price = (demand - supply) / slope
    return price > 0 ? price : 0
  }

  customers () {
    return this.city.population * this.popularityPct / 100
  }

  demandedAmount () {
    let rvar = (-0.5 + Math.random()) * 20
    return (Math.floor(this.city.population * (this.popularityPct + rvar) / 100))
  }
}
