import config from '../../config'
import DemandFunction from './DemandFunction'

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

  buyTurnips (producedTurnips, buyYearlyHarvest) {
    this.fulfilledAndEarnings = this.turnipDemandFn.weekly(producedTurnips.weekly)
    this.harvestedTurnips += producedTurnips.yearly
    if (buyYearlyHarvest) this.buyYearlyTurnips(this.harvestedTurnips)
    return this.fulfilledAndEarnings
  }

  buyYearlyTurnips (supply) {
    let yearlyfulfilledAndEarnings = this.turnipDemandFn.yearly(supply)
    this.harvestedTurnips = 0
    this.fulfilledAndEarnings.earnings += yearlyfulfilledAndEarnings.earnings
    this.fulfilledAndEarnings.percentage = yearlyfulfilledAndEarnings.percentage
  }

  increasePopulation (amount) {
    this.population = this.population + amount
  }

  // increaseDemand (amount) {
  //   this.demand = this.demand + amount
  // }

  // resetTurnips () {
  //   this.turnips = config.cityInitialTurnips
  // }

  // receiveTurnips (amount) {
  //   this.turnips = this.turnips + amount
  // }

  payPlayerAccordingToDemandSatisfied () {
    // if turnips equals demand player gets ? points
  }
}
