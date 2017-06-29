import config from '../config'

export default class City {
  /**
   * Creates a city with a given name
   *
   * @param {String} name - name for the city
   */
  constructor ({ name }) {
    this.name = name
    this.population = config.cityInitialPopulation
    this.demand = config.cityInitialDemand
    this.turnips = config.cityInitialTurnips
  }
  /**
   * The population of the city is increased.
   *
   * @param {number} amount - amount of new population
   */
  increasePopulation (amount) {
    this.population = this.population + amount
  }
  /**
   * The demand of the city is increased.
   *
   * @param {number} amount - amount of new demand
   */
  increaseDemand (amount) {
    this.demand = this.demand + amount
  }
  /**
   * The amount of turnips given to the city is reset.
   */
  resetTurnips () {
    this.turnips = config.cityInitialTurnips
  }
  /**
   * The amount of turnips received by the city is increased.
   *
   * @param {number} amount - amount of new turnips
   */
  receiveTurnips (amount) {
    this.turnips = this.turnips + amount
  }
  /**
   * Description goes here
   *
   */
  payPlayerAccordingToDemandSatisfied () {
    // if turnips equals demand player gets ? points
  }
}
