import StructureTypeFilter from '../baseclasses/StructureTypeFilter'

export default class NameStructureTypeFilter extends StructureTypeFilter {
  constructor ({gameState, json}) {
    super(gameState) /* istanbul ignore next */
    this.names = json.structureTypes
  }

  isValid (structureType) {
    for (let name of this.names) {
      if (name === structureType.name) return true
    }
    return false
  }
}
