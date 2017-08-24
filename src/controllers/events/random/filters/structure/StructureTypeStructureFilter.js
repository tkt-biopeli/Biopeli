import StructureFilter from './StructureFilter'

export default class StructureTypeStructureFilter extends StructureFilter {
  constructor ({ gameState, json }) {
    super(gameState)
    this.structureTypeNames = json.structureTypes
  }

  isValid (structure) {
    for (let name of this.structureTypeNames) {
      if (name === structure.structureType.name) return true
    }
    return false
  }
}
