import config from '../../config'

export default class City {
  constructor ({ name }) {
    this.name = name
    this.population = config.cityInitialPopulation
    this.demand = config.cityInitialDemand
    this.turnips = config.cityInitialTurnips
    this.slope = 2        
  }

  buyTurnips(supply) {
    let ratio = supply / (this.population / 2)
    let fulfilledPct = ratio < 1 ? ratio * 100 : 100
        
    return {
      percentage : fulfilledPct,
      earnings: supply * this.equilibriumPrice(supply)
    }
  }

  equilibriumPrice(supply) {
    let price = (this.population - supply) / this.slope
    return price > 0 ? price : 0
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
