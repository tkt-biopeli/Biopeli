import Effect from './Effect'

export default class CityEffect extends Effect {
  constructor ({gameState, json}) {
    super()
    this.city = gameState.city
    this.populationChange = json.populationChange != null ? json.populationChange : 0
  }

  happen () {
    this.city.population = this.populationChange * this.city.population
  }
}
