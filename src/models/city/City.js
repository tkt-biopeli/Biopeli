import config from '../../config'
import DemandFunction from './DemandFunction'

export default class City {
  constructor ({ name, startPopulation }) {
    this.name = name
    this.population = config.cityInitialPopulation
    this.turnipDemand = new DemandFunction({
      city: this, popularityPct: 250, slope: 6
    })
  }

  buyTurnips (producedTurnips, endOfTheYear) {
    let cash = this.turnipDemand.weekly(producedTurnips.weekly)
    if (endOfTheYear) this.turnipDemand.yearly()
    return cash
  }

  increasePopulation (amount) {
    this.population = this.population + amount
  }
}
