import * as FilterComponents from '../FilterComponents'

export default class AllStructureFilter {
  constructor ({gameState, json}) {
    this.player = gameState.player
  }

  isValid (structure) { return true }

  affected () {
    const isValidFn = (structure) => { return this.isValid(structure) }
    return FilterComponents.structuresAffected(this.player.structures.values, isValidFn)
  }
}
