import config from '../config'

export default class City {
  constructor (name) {
    this.name = name || 'City'
    this.demand = config.cityInitialDemand
    this.turnips = config.cityInitialTurnips
  }

  /* Moi Miia, nämä vähän turhia javascriptis, ku city.name on oikeastaan parempi
     kun city.getName koska se on getteri ja setteri samalla.
  getName () {
    return this.name
  }
  getDemand () {
    return this.demand
  }
  getTurnips () {
    return this.turnips
  }
  */
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
