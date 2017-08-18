export default class StructureTypeFilter {
  constructor ({ gameState }) {
    this.structureTypes = gameState.structureTypes
  }

  affected() {
    var types = []
    for (let structureType of this.structureTypes) {
      if (this.isValid(structureType)) {
          types.push(structureType)
      }
    }

    return types
  }

  // abstrakti
  isValid(structureType) {
    return true
  }
}
