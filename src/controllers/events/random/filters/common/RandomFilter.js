import FilterGetterComponent from '../components/FilterGetterComponent'
import Random from '../../../../../utils'

export default class RandomFilter {
  constructor ({ gameState, json }) {
    this.filterGetterComponent = new FilterGetterComponent({
      gameState: gameState
    })
    this.filter = this.filterGetterComponent.getFilter(json.filter)
    this.amount = json.amount
    this.getRandom = Random.randomWithBounds
  }

  affected () {
    var innerAffected = this.filter.affected()

    var affected = []
    while (innerAffected.length > 0 && affected.length < this.amount) {
      var random = this.getRandom(0, innerAffected.length)

      affected.push(innerAffected[random])
      innerAffected.splice(random, 1)
    }
    return affected
  }
}
