import * as AffectedFunctions from '../AffectedFunctions'

export default class StructureTypeFilter {
  constructor (gameState) {
    this.structureTypes = gameState.structureTypes
  }

  affected () {
    const isValidFn = (structureType) => { return this.isValid(structureType) }
    return AffectedFunctions.strucTypesAffected(this.structureTypes, isValidFn)
  }
}
