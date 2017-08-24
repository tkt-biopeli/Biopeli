import StructureTypeFilter from '../baseclasses/StructureTypeFilter'

export default class NameStructureTypeFilter extends StructureTypeFilter {
  constructor ({gameState, json}) {
    super(gameState)
    this.names = json.structureTypes
  }

  isValid (structureType) { return true }
}
