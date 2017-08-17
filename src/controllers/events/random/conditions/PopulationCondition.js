export default class PopulationCondition {
  constructor ({ gameState, json }) {
    this.city = gameState.city
    this.upperLimit = json.notAfter
    this.lowerLimit = json.notBefore
  }

  canHappen () {
    let population = this.city.population

    if (this.upperLimit != null) {
      if (population > this.upperLimit) return false
    }

    if (this.lowerLimit != null) {
      if (population < this.lowerLimit) return false
    }

    return true
  }
}
