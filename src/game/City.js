import config from '../config'

export default class City {
  constructor ({ name }) {
    this.name = name
    this.population = config.cityInitialPopulation
    this.demand = config.cityInitialDemand
    this.turnips = config.cityInitialTurnips
  }

  increasePopulation (amount) {
    this.population = this.population + amount
  }

  increaseDemand (amount) {
    this.demand = this.demand + amount
  }

  resetTurnips () {
    this.turnips = config.cityInitialTurnips
  }

  receiveTurnips (amount) {
    this.turnips = this.turnips + amount
  }

  payPlayerAccordingToDemandSatisfied () {
    // if turnips equals demand player gets ? points
  }
}
