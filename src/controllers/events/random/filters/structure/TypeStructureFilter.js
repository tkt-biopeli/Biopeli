import * as AffectedFunctions from '../AffectedFunctions'

export default class TypeStructureFilter {
  constructor ({ gameState, json }) {
    this.player = gameState.player
    this.types = json.types
  }

  isValid (structure) {
    for (let type of this.types) {
      if (type === structure.structureType.type) return true
    }
    return false
  }

  affected () {
    const isValidFn = (structure) => { return this.isValid(structure) }
    return AffectedFunctions.structuresAffected(this.player.structures.values, isValidFn)
  }
}
