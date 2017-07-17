import DemandFunction from './DemandFunction'

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

  buyTurnips (producedTurnips, endOfTheYear) {
    let cash = this.turnipDemand.weekly(producedTurnips)
    if (endOfTheYear) this.endOfTheYear()
    return cash
  }

  endOfTheYear () {
    this.increasePopulation(this.turnipDemand.percentageSupplied())
    this.turnipDemand.calculateYearlyDemand()
  }

  increasePopulation (percentageSupplied) {
    var percentage = percentageSupplied <= 1
      ? 0.5 * percentageSupplied + 0.75
      : percentageSupplied + 0.25

    this.population *= percentage
    this.population = Math.ceil(this.population)
  }
}
