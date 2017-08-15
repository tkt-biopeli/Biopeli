import StructureFilter from './StructureFilter'

export default class TypeStructureFilter extends StructureFilter{
  constructor ({gameState, json}) {
    super(gameState)

    this.types = json.types
  }

  isValid (structure) {
    for (let type of this.types) {
      if(type === structure.structureType.type) return true
    }

    return false
  }
}