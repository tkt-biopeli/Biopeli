import FilterGetterComponent from '../components/FilterGetterComponent'

export default class Complement {
  constructor ({ gameState, json }) {
    this.filterGetterComponent = new FilterGetterComponent({
      gameState: gameState
    })
    this.from = this.filterGetterComponent.getFilter(json.from)
    this.toRemove = this.filterGetterComponent.getFilter(json.remove)
  }

  affected () {
    let affectedSet = new Set(this.from.affected())
    let excludedElementSet = this.toRemove.affected()

    for (let excludedElement of excludedElementSet) {
      if (affectedSet.has(excludedElement)) {
        affectedSet.delete(excludedElement)
      }
    }
    return Array.from(affectedSet)
  }
}
