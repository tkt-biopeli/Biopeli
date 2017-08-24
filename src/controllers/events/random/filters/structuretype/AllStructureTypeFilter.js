import * as AffectedFunctions from '../AffectedFunctions'

export default class NameStructureTypeFilter {
  constructor ({gameState, json}) {
    this.structureTypes = gameState.structureTypes
    this.names = json.structureTypes
  }

  isValid (structureType) { return true }

  affected () {
    const isValidFn = (structureType) => { return this.isValid(structureType) }
    return AffectedFunctions.strucTypesAffected(this.structureTypes, isValidFn)
  }
}
