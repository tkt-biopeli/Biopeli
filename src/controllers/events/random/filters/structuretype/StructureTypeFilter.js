export default class StructureTypeFilter {
  constructor ({ gameState }) {
    this.structureTypes = gameState.structureTypes
  }

  affected() {
    var types = []
    for (let structureTypeKey of Object.keys(this.structureTypes)) {
      let structureType = this.structureTypes[structureTypeKey]
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
