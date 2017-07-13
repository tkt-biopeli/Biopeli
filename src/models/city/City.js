import config from '../../config'
import DemandFunction from './DemandFunction'

export default class City {
  constructor ({ name, startPopulation }) {
    this.name = name
    this.population = startPopulation
    this.turnipDemand = new DemandFunction({
      city: this, popularityPct: 250, startConstantPrice: 10
    })
  }

  buyTurnips (producedTurnips, endOfTheYear) {
    let cash = this.turnipDemand.weekly(producedTurnips)
    if (endOfTheYear) this.endOfTheYear()
    return cash
  }

  endOfTheYear(){
    this.increasePopulation(this.turnipDemand.percentageSupplied())
    this.turnipDemand.yearly()
  }

  increasePopulation (percentageSupplied) {
    var percentage = percentageSupplied <= 1 ?
    0.5 * percentageSupplied - 0.25 :
    percentageSupplied - 0.5

    this.population *= percentage
    this.population = Math.floor(this.population)
  }
}
