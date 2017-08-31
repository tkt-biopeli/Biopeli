export default class StructureTypeFilter {
  constructor (gameState) {
    this.structureTypes = gameState.structureTypes
  }

  affected () {
    var structureTypeKeys = Object.keys(this.structureTypes)
    var affected = []

    structureTypeKeys.forEach(key => {
      let structureType = this.structureTypes[key]
      if (this.isValid(structureType)) {
        affected.push(structureType)
      }
    })
    return affected
  }
}
