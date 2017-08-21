import StructureTypeFilter from './StructureTypeFilter'

export default class NameStructureTypeFilter extends StructureTypeFilter {
  constructor ({gameState, json}) {
    super({gameState: gameState})

    this.names = json.structureTypes
  }

  isValid (structureType) {
    for (let name of this.names) {
      if(name === structureType.name) return true
    }

    return false
  }
}