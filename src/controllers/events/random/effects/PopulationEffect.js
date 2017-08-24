export default class PopulationEffect {
  constructor ({gameState, json}) {
    this.city = gameState.city
    this.changeAmount = json.changePercentage
  }

  realizeEvent () {
    this.city.population = Math.floor(this.city.population * this.changeAmount)
  }
}
