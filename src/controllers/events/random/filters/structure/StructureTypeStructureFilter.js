import StructureFilter from '../baseclasses/StructureFilter'

export default class StructureTypeStructureFilter extends StructureFilter {
  constructor ({ gameState, json }) {
    super(gameState) /* istanbul ignore next */
    this.structureTypeNames = json.structureTypes
  }

  isValid (structure) {
    for (let name of this.structureTypeNames) {
      if (name === structure.structureType.name) return true
    }
    return false
  }
}
