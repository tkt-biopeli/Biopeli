import * as FilterComponents from '../FilterComponents'

export default class NameStructureTypeFilter {
  constructor ({gameState, json}) {
    this.structureTypes = gameState.structureTypes
    this.names = json.structureTypes
  }

  isValid (structureType) {
    for (let name of this.names) {
      if (name === structureType.name) return true
    }
    return false
  }

  affected () {
    const isValidFn = (structureType) => { return this.isValid(structureType) }
    return FilterComponents.strucTypesAffected(this.structureTypes, isValidFn)
  }
}
