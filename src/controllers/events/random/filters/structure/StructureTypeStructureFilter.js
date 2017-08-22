import * as FilterComponents from '../FilterComponents'

export default class StructureTypeStructureFilter {
  constructor ({ gameState, json }) {
    this.player = gameState.player
    this.structureTypeNames = json.structureTypes
  }

  isValid (structure) {
    for (let name of this.structureTypeNames) {
      if (name === structure.structureType.name) return true
    }
    return false
  }

  affected () {
    const isValidFn = (structure) => { return this.isValid(structure) }
    return FilterComponents.structuresAffected(this.player.structures.values, isValidFn)
  }
}
